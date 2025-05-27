"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import HamburgerMenu from "@/components/HamburgerMenu";
import React, { useState } from "react";

type Recipe = {
    title: string;
    ingredients: string;
    instructions: string;
    image: string;
    calories?: number;
    time?: string;
};

export default function SuggestorPage() {
    const { user } = useUser();
    const [input, setInput] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [results, setResults] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addIngredient = () => {
        if (input.trim() && !ingredients.includes(input.trim().toLowerCase())) {
            setIngredients([...ingredients, input.trim().toLowerCase()]);
            setInput("");
        }
    };

    const removeIngredient = (idx: number) => {
        setIngredients(ingredients.filter((_, i) => i !== idx));
    };

    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const res = await fetch("http://localhost:8010/suggest_recipes/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients }),
            });
            if (!res.ok) throw new Error("Server Error");
            const data = await res.json();
            setResults(data.recipes || []);
        } catch (err: any) {
            setError(err.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };

    function parseCList(str: string): string[] {
        if (!str) return [];

        str = str.trim();

        if (str.startsWith("c(") && str.endsWith(")")) {
            let inner = str.slice(2, -1);
            inner = inner.replace(/"/g, "");

            return inner.split(",").map(s => s.trim()).filter(Boolean);
        }

        if (str.includes(","))
            return str.replace(/"/g, "").split(",").map(s => s.trim()).filter(Boolean);

        return [str.replace(/"/g, "")];
    }


    return (
        <main className="min-h-screen bg-background flex flex-col items-center">
            <div className="w-full max-w-md relative bg-card rounded-2xl shadow-2xl p-4 mt-4">

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <HamburgerMenu />
                    </div>
                    <h1 className="flex-1 text-center text-text text-lg font-bold">Recipe Suggestor</h1>
                    <div className="text-right">
                        <UserButton />
                    </div>
                </div>

                <p className="mb-3 text-text text-lg font-semibold text-center">
                    Hi, {user?.firstName || user?.username}!
                </p>


                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-base text-text focus:outline-none"
                        placeholder="Enter ingredient..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addIngredient()}
                    />
                    <button
                        onClick={addIngredient}
                        className="bg-primary text-white rounded-xl px-4 py-2 font-semibold"
                    >
                        Add
                    </button>
                </div>


                {ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {ingredients.map((ing, idx) => (
                            <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center">
                                {ing}
                                <button className="ml-2 text-gray-400 hover:text-red-600" onClick={() => removeIngredient(idx)}>
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                )}


                <button
                    onClick={fetchRecipes}
                    disabled={ingredients.length === 0 || loading}
                    className="w-full bg-primary text-white font-bold py-3 rounded-xl mt-2 disabled:opacity-50 transition"
                >
                    {loading ? "Searching recipes..." : "Show recipes"}
                </button>


                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mt-2 text-center">
                        {error}
                    </div>
                )}


                <div className="mt-4 flex flex-col gap-4">
                    {results.length > 0 && (
                        <div className="mb-2 text-text font-semibold text-center">
                            Found {results.length} recipes:
                        </div>
                    )}
                    {results.length === 0 && !loading && (
                        <div className="text-gray-400 text-center">No recipes shown.</div>
                    )}
                    {results.map((r, idx) => (
                        <div key={idx} className="rounded-2xl shadow bg-background/90 p-3 flex flex-col gap-2">
                            <div className="text-lg font-bold text-text">{r.title}</div>
                            <div className="flex gap-4 items-center text-xs text-gray-600 mb-1">
                                {r.calories && (
                                    <span className="bg-neutral-900 text-orange-400 rounded px-2 py-0.5">🍽️ {r.calories} kcal</span>
                                )}
                                {r.time && (
                                    <span className="bg-neutral-900  text-blue-400 rounded px-2 py-0.5">⏱️ {r.time.replace('PT', '').toLowerCase()}</span>
                                )}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                                <strong>Ingredients: </strong>
                                {typeof r.ingredients === "string" && parseCList(r.ingredients).map((ing, idx) =>
                                    <span key={idx} className="inline-block mr-1">{ing}{idx < parseCList(r.ingredients).length - 1 && ","}</span>
                                )}
                            </div>
                            <details className="text-xs text-gray-700">
                                <summary className="cursor-pointer font-semibold">Instructions </summary>
                                {typeof r.instructions === "string" && parseCList(r.instructions).map((step, idx) =>
                                    <div key={idx}>{step}</div>
                                )}
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
