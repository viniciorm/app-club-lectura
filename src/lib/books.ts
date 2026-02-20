import Papa from "papaparse";
import { Book, CSVBook } from "./types";

export async function fetchBooks(): Promise<Book[]> {
    const CSV_URL = process.env.NEXT_PUBLIC_CSV_URL || "";

    if (!CSV_URL) {
        console.error("NEXT_PUBLIC_CSV_URL is not defined in environment variables");
        return [];
    }

    // console.log("Attempting to fetch books from:", CSV_URL);

    try {
        const response = await fetch(CSV_URL, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvContent = await response.text();

        if (!csvContent || csvContent.trim().length === 0) {
            console.warn("Received empty CSV content from URL");
            return [];
        }

        return new Promise((resolve, reject) => {
            Papa.parse<CSVBook>(csvContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.errors.length > 0) {
                        console.warn("CSV parsing warnings/errors:", results.errors);
                    }

                    if (!results.data || results.data.length === 0) {
                        console.warn("No data found after parsing CSV");
                        resolve([]);
                        return;
                    }

                    const books: Book[] = results.data
                        .filter(row => row["Título Curado"] && row["Enlace Directo"]) // Basic validation
                        .map((row) => {
                            const originalName = row["Nombre Original"] || "";
                            const extension = originalName.split('.').pop()?.toUpperCase() || "???";

                            return {
                                title: row["Título Curado"] || "",
                                author: row["Carpeta / Autor"] || "Desconocido",
                                url: row["Enlace Directo"] || "",
                                originalName: originalName,
                                extension: extension.length > 4 ? "DOC" : extension,
                                date: row["Fecha"] || "N/A",
                            };
                        });

                    // console.log(`Successfully loaded ${books.length} books`);
                    resolve(books);
                },
                error: (error: any) => {
                    console.error("PapaParse error:", error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error("Critical error fetching books:", error);
        return [];
    }
}
