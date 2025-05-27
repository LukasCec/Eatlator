# Eatlator

**Eatlator** is a modern mobile-first web application that combines AI-powered menu translation and recipe suggestions to help users better understand foreign menus and find new meal ideas using ingredients they have at home. Eatlator makes it easier for travelers, foodies, and home cooks to break down language barriers and discover delicious recipes in just a few clicks.

---

## Features

### Menu OCR Translator
- Upload a photo of a restaurant menu in any language.
- Eatlator extracts the text using OCR, detects the language, and translates the dishes, prices, and ingredients into English (or other target languages).

### Recipe Suggestor
- Enter the ingredients you have at home.
- Eatlator recommends recipes you can cook, including preparation time and calorie information, from a vast database (using the RecipeNLG dataset).

### User Authentication
- Secure login and registration powered by Clerk, including Google OAuth support.

### Mobile-first UI
- Fully responsive, clean, and modern design, optimized for mobile devices with a beautiful dark color scheme.

### Personal Profile
- Manage your profile and settings directly through the Clerk interface.

---

## Tech Stack

### Frontend
- **Next.js 15+** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Clerk** for authentication

### Backend
- **FastAPI** for the API
- **EasyOCR** for image-to-text (OCR)
- **Transformers (Hugging Face)** for language detection and translation
- **Pandas + SQLite3** for efficient recipe search and database management
- **KaggleHub** for downloading the open RecipeNLG/foodcom dataset

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python (3.9+ recommended)
- Pip and virtualenv for Python dependencies

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Eatlator.git
cd Eatlator
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

#### Initialize Recipe Database

```bash
python init_db.py
```

> This will download the Food.com Recipes dataset and create a local `recipes.db` SQLite database.

#### Run the API

```bash
uvicorn main:app --reload --port 8010
```

---

### 3. Frontend Setup (Next.js + Clerk)

```bash
cd ../frontend
npm install
```

#### Configure Clerk

- Sign up at [Clerk.dev](https://clerk.dev)
- Create a project and obtain your **Publishable Key** and **Secret Key**
- Set your Clerk environment variables in `.env.local`:

```ini
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

#### Start Next.js Dev Server

```bash
npm run dev
```

> The app should be running at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Log in** or create an account (Google OAuth available)

2. **Menu Translator**:
   - Go to Menu Translator
   - Upload or take a photo of a menu
   - Instantly see translated dishes and ingredients in English with prices

3. **Recipe Suggestor**:
   - Go to Recipe Suggestion
   - Enter available ingredients
   - Get recipe ideas, including time and calorie information

4. **Profile**:
   - Manage your profile and connected accounts

---

## Folder Structure

```bash
Eatlator/
├── backend/        # FastAPI app, OCR & translation logic, recipe DB
│   ├── main.py
│   ├── init_db.py
│   ├── recipes.db
│   └── ...
├── frontend/       # Next.js (App Router) app, mobile-first UI
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── ...
├── README.md
└── ...
```

---

## Screenshots

*Add screenshots here to showcase the main UI and features!*

---

## License

This project is for educational and personal use.  
For commercial or large-scale deployment, check the licenses of all included datasets and libraries.

---

## Credits

- Food.com Recipes Dataset ([Kaggle](https://www.kaggle.com/datasets))
- HuggingFace Transformers
- EasyOCR
- Clerk.dev Authentication
- Next.js, FastAPI, Tailwind CSS

---

Happy cooking & translating with **Eatlator**!
