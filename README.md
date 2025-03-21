# Proyecto Full Stack

Este repositorio contiene el frontend y backend de mi aplicación.

## 📂 Estructura

- `frontend/` → Código del cliente (React)
- `backend/` → Código del servidor (Flask)

## 🚀 Cómo ejecutar

1. Entra a `frontend/` y ejecuta `bun install` luego `bun run dev`.
2. Entra a `backend/` y ejecuta `poetry install`.

**Nota:** Poetry por defecto instala el entorno virtual en una carpeta de caché `.cache/pypoetry/virtualenvs/` y seguirá existiendo en la caché hasta que lo elimines manualmente con: `poetry env remove <nombre-del-entorno>`.

Solo se borrará automáticamente cuando:

- Ejecutes un comando para limpiar caché, como `poetry cache clear pypoetry --all`.
- Si eliminas la carpeta `.cache/pypoetry/virtualenvs/` manualmente.
- Si reinstalas Poetry o cambias de versión de Python y el entorno deja de ser compatible.

Si en tu caso quieres que el entorno virtual `.venv` no se guarde en caché y esté dentro de tu proyecto, configura: `- poetry config virtualenvs.in-project true`.
