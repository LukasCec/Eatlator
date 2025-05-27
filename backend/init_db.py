import kagglehub
import pandas as pd
import sqlite3
import os


print("Sťahujem dataset z Kaggle...")
path = kagglehub.dataset_download("irkaal/foodcom-recipes-and-reviews")
print("Cesta k datasetu:", path)
dataset_file = os.path.join(path, "recipes.csv")


if not os.path.exists(dataset_file):
    print("RAW_recipes.csv nebol nájdený, pozri obsah adresára:")
    print(os.listdir(path))
    exit(1)


print("Načítavam dataset...")
df = pd.read_csv(dataset_file)
print(df.columns)
print(df.head())


print("Sampling 100 000 receptov na test...")
df_sample = df.sample(100000, random_state=42)


df_sample = df_sample[
    ["Name", "RecipeIngredientParts", "RecipeInstructions", "Images", "Calories", "TotalTime"]
].rename(
    columns={
        "Name": "title",
        "RecipeIngredientParts": "ingredients",
        "RecipeInstructions": "instructions",
        "Images": "image",
        "Calories": "calories",
        "TotalTime": "time"
    }
)

def extract_first_url(img):
    if pd.isnull(img):
        return ""
    if isinstance(img, str) and img.startswith("c("):
        urls = img[2:-1].replace('"', '').split(",")
        return urls[0].strip()
    return img

df_sample["image"] = df_sample["image"].apply(extract_first_url)


print("Ukladám do recipes.db...")
conn = sqlite3.connect("recipes.db")
df_sample.to_sql("recipes", conn, if_exists="replace", index=False)
conn.close()
print("Hotovo! SQLite databáza recipes.db pripravená.")
