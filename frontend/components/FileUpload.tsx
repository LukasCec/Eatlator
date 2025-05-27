"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import ResultCard from "@/components/ResultCard";

export default function FileUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (fileList: FileList | null) => {
        if (fileList && fileList[0]) {
            setFileName(fileList[0].name);
            setLoading(true);
            setResults([]);
            setError(null);

            const formData = new FormData();
            formData.append("file", fileList[0]);
            try {
                const res = await axios.post("http://localhost:8010/parse_menu/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setResults(res.data);
            } catch (err) {
                setError("Chyba pri spracovaní obrázku");
            }
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center">

            <label
                htmlFor="file-upload"
                className={`
          flex flex-col items-center justify-center
          w-full h-44 rounded-2xl border-2 border-dashed border-primary/60
          cursor-pointer transition
          ${dragOver ? "bg-primary/10 border-primary" : "bg-[#23272d]"}
          shadow-lg mb-4
        `}
                onDragOver={e => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={e => {
                    e.preventDefault();
                    setDragOver(false);
                }}
                onDrop={e => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFile(e.dataTransfer.files);
                }}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={inputRef}
                    className="hidden"
                    onChange={e => handleFile(e.target.files)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                    <path
                        d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                        fill="white"
                    />
                </svg>
                <span className="text-text text-base mt-2 font-medium">
          {fileName ? (
              <>
                  <span className="text-primary">{fileName}</span>
              </>
          ) : (
              <>
                  Upload a photo of your menu
                  <span className="block text-muted text-center text-xs mt-1">
                (Click or drag image here)
              </span>
              </>
          )}
        </span>
            </label>


            {loading && (
                <div className="flex flex-col items-center my-4">
                    <svg className="animate-spin h-7 w-7 text-primary mb-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span className="text-primary text-base">Processing menu...</span>
                </div>
            )}

            {error && (
                <div className="text-red-500 text-center mb-2">{error}</div>
            )}


            <div className="w-full flex flex-col gap-2">
                {results.map((item, idx) => (

                    <ResultCard key={idx} item={item} />
                ))}
            </div>
        </div>
    );
}
