# Club de Lectura - Biblioteca Digital 📚

Este proyecto es una WebApp moderna diseñada para un club de lectura, permitiendo explorar y descargar más de 1,800 títulos de forma eficiente y elegante.

## ✨ Características

- **Diseño Glassmorphism**: Estética premium con transparencias y modo oscuro dinámico.
- **Búsqueda Avanzada (Fuzzy Search)**: Filtro en tiempo real que ignora acentos y mayúsculas.
- **Descargas Directas**: Botón optimizado para descargar archivos directamente desde Google Drive.
- **Indicadores de Formato**: Detección automática de extensiones (PDF, EPUB, etc.) con etiquetas visuales.
- **Optimización ISR**: Revalidación automática de datos cada hora para asegurar que la biblioteca esté siempre actualizada.
- **Mobile First**: Totalmente responsivo para una experiencia fluida en cualquier dispositivo.

## 🛠️ Tecnologías

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Procesamiento de Datos**: [PapaParse](https://www.papaparse.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)

## 🚀 Configuración e Instalación

### 1. Requisitos previos
- Node.js 18+ instalado.
- Un repositorio de GitHub para el despliegue.

### 2. Instalación local
```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd app-club-lectura

# Instalar dependencias
npm install
```

### 3. Configuración de Variables de Entorno
El enlace a la fuente de datos (CSV) está protegido y no se sube al control de versiones. Debes configurar la URL de tu hoja de cálculo pública.

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edita `.env.local` y añade tu URL:
   ```env
   NEXT_PUBLIC_CSV_URL=https://your-public-google-sheets-csv-link
   ```

### 4. Despliegue en Vercel
1. Conecta tu repositorio a un nuevo proyecto en Vercel.
2. En la sección de **Environment Variables**, añade `NEXT_PUBLIC_CSV_URL` con el enlace al CSV.
3. ¡Despliega y listo!

## 📄 Notas de Desarrollo
Los datos se consumen desde un CSV público de Google Sheets. El sistema extrae automáticamente el formato del archivo desde la columna "Nombre Original" y genera enlaces de descarga directa transformando los URLs de visualización de Drive.

---
Proyecto creado como demostración de una WebApp de alto rendimiento y estética moderna.
