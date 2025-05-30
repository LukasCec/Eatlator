import re
import tempfile
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from langdetect import detect
from transformers import pipeline
import easyocr
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
from typing import List
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # alebo ["*"] pre vývoj, potom obmedz!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(['it', 'en', 'fr', 'es', 'de', 'pt', 'nl', 'cs', 'sk'])

lang2model = {
    "it": "Helsinki-NLP/opus-mt-it-en",
    "fr": "Helsinki-NLP/opus-mt-fr-en",
    "es": "Helsinki-NLP/opus-mt-es-en",
    "de": "Helsinki-NLP/opus-mt-de-en",
    "nl": "Helsinki-NLP/opus-mt-nl-en",
    "cs": "Helsinki-NLP/opus-mt-cs-en",
    "sk": "Helsinki-NLP/opus-mt-sk-en",
    "en": None
}

price_pattern = re.compile(r"([€${£{])\s?(\d{1,3})")
section_words = set([
    'menu', 'menù', 'karte', 'cart', 'carta', 'menus',
    'main', 'primi', 'piatti', 'entrées', 'antipasti', 'dessert', 'dolce', 'postres', 'nachspeisen', 'beverages', 'drinks', 'dranken',
    'suppen', 'salads', 'salate', 'appetizer', 'voorgerechten', 'meats', 'carne', 'salad', 'ensaladas'
])
address_words = [
    'via', 'calle', 'strasse', 'straße', 'street', 'avenue', 'boulevard', 'rue', 'platz', 'plaza', 'pl.', 'road', 'rd.', 'allee', 'gasse'
]

def is_not_food_line(line):
    l = line.lower().strip()
    if any(l.startswith(word) or word in l for word in section_words):
        return True
    if any(l.startswith(word) for word in address_words):
        return True
    if l.startswith("www") or l.startswith("http") or l.startswith("+"):
        return True
    if l.replace(" ", "").isdigit() or (any(c.isdigit() for c in l) and len(l) < 8):
        return True
    if len(l) < 3:
        return True
    if "," in l and len(l.split(',')) == 2 and all(part.strip().isalpha() for part in l.split(',')):
        return True
    return False

def process_menu_image(file_path):
    results = reader.readtext(file_path)
    lines = [result[1].strip() for result in results if result[1].strip()]
    menu_items = []
    i = 0
    while i < len(lines) - 1:
        dish = lines[i]
        next_line = lines[i + 1]
        price_match = price_pattern.match(next_line)
        if price_match and not is_not_food_line(dish):
            symbol = price_match.group(1)
            price = price_match.group(2)
            ingredients = []
            j = i + 2
            while j < len(lines):
                l = lines[j]
                if price_pattern.match(l) or is_not_food_line(l):
                    break
                if l and (l[0].islower() or ',' in l):
                    ingredients.append(l)
                elif len(l.split()) > 3 and not price_pattern.match(l):
                    ingredients.append(l)
                else:
                    break
                j += 1
            menu_items.append((dish, f"{symbol}{price}", " ".join(ingredients)))
            i = j
        else:
            i += 1

    dishes = [dish for dish, price, _ in menu_items]
    langs = [detect(dish) for dish in dishes]
    en_dishes = []
    for dish, lang in zip(dishes, langs):
        if lang == "en":
            en_dishes.append(dish)
        else:
            model = lang2model.get(lang)
            if model is None:
                model = "Helsinki-NLP/opus-mt-mul-en"
            trans = pipeline("translation", model=model)
            out = trans(dish)
            en_dishes.append(out[0]['translation_text'])

    response = []
    for ((orig, price, ingredients), lang, en_dish) in zip(menu_items, langs, en_dishes):
        response.append({
            "original": orig,
            "lang": lang,
            "english": en_dish,
            "price": price,
            "ingredients": ingredients
        })
    return response


DB_PATH = "recipes.db"

class RecipeRequest(BaseModel):
    ingredients: List[str]

def find_recipes(ingredients: List[str], limit=2000):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    where = " AND ".join([f'ingredients LIKE "%{i}%"' for i in ingredients])
    query = f"SELECT title, ingredients, instructions, image, calories, time FROM recipes WHERE {where} LIMIT {limit};"
    c.execute(query)
    recipes = c.fetchall()
    conn.close()
    return [
        {
            "title": r[0],
            "ingredients": r[1],
            "instructions": r[2],
            "image": r[3],
            "calories": r[4],
            "time": r[5]
        }
        for r in recipes
    ]


class TitleSearchRequest(BaseModel):
    query: str

@app.post("/find_recipe_by_title/")
async def find_recipe_by_title(req: TitleSearchRequest):
    if not req.query or len(req.query.strip()) < 2:
        return {"recipes": []}
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    q = req.query.strip().lower()

    query = f"""
        SELECT title, ingredients, instructions, image, calories, time
        FROM recipes
        WHERE LOWER(title) LIKE ? OR LOWER(ingredients) LIKE ?
        LIMIT 200;
    """
    c.execute(query, (f"%{q}%", f"%{q}%"))
    recipes = c.fetchall()
    conn.close()
    return {
        "recipes": [
            {
                "title": r[0],
                "ingredients": r[1],
                "instructions": r[2],
                "image": r[3],
                "calories": r[4],
                "time": r[5]
            }
            for r in recipes
        ]
    }

@app.post("/suggest_recipes/")
async def suggest_recipes(req: RecipeRequest):
    if not req.ingredients:
        return {"recipes": []}
    recipes = find_recipes([i.lower() for i in req.ingredients])
    return {"recipes": recipes}

@app.post("/parse_menu/")
async def parse_menu(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    try:
        result = process_menu_image(tmp_path)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


