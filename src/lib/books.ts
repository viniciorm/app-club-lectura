import Papa from "papaparse";
import { Book, CSVBook } from "./types";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTv78_T9KrkAUyiUVrI1l3yLh7dTFAGrB_jDEFQJH0a8fm77yA2A9hvrF-Funbbj1safFLJ31Av6Ktx/pub?gid=0&single=true&output=csv";

export async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await fetch(CSV_URL);
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
