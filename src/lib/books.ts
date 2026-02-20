import Papa from "papaparse";
import { Book, CSVBook } from "./types";

const CSV_URL = process.env.NEXT_PUBLIC_CSV_URL || "";

export const revalidate = 3600;

export async function fetchBooks(): Promise<Book[]> {
    if (!CSV_URL) {
        console.error("NEXT_PUBLIC_CSV_URL is not defined");
        return [];
    }
    try {
        const response = await fetch(CSV_URL, {
            next: { revalidate: 3600 }
        });
        const csvContent = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse<CSVBook>(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const books: Book[] = results.data.map((row) => {
                        const originalName = row["Nombre Original"] || "";
                        const extension = originalName.split('.').pop()?.toUpperCase() || "???";

                        return {
                            title: row["Título Curado"] || "",
                            author: row["Carpeta / Autor"] || "",
                            url: row["Enlace Directo"] || "",
                            originalName: originalName,
                            extension: extension.length > 4 ? "DOC" : extension, // Fallback for long strings
                            date: row["Fecha"] || "",
                        };
                    });
                    resolve(books);
                },
                error: (error: any) => {
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}
