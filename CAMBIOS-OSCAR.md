# Cambios — Aporte de Oscar (Laboratorio 3 · Frontend)

> **Autor:** Oscar Ernesto Rivas Salguero · RS0821
> **Rol:** Frontend
> **Fecha:** Mayo 2026

## Resumen

Se agregó la **simulación visual del CRUD** sobre la vista de Tareas y Hábitos
que ya habían armado los compañeros, **sin modificar el diseño existente** ni
los estilos definidos en `styles.css`.

## Archivos del equipo (intactos)

| Archivo       | Estado     |
|---------------|------------|
| `styles.css`  | ✅ Idéntico al original (0 cambios) |
| `index.html`  | ⚠️ Solo adiciones marcadas con comentarios `<!-- AGREGADO POR OSCAR -->` |

## Archivos nuevos

| Archivo      | Contenido |
|--------------|-----------|
| `script.js`  | Lógica de simulación CRUD (POST / PUT / DELETE) |
| `script.css` | Estilos del toast (reutiliza las variables CSS del equipo) |

## Detalle de adiciones en `index.html`

1. `<link rel="stylesheet" href="script.css">` en el `<head>`
2. **Dos cards adicionales** en `#study-section` para que la sección no se vea vacía:
   - "Resolver ejercicios de Estructuras de Datos"
   - "Repaso de Cálculo III"
3. **Nuevo `<dialog id="delete-modal">`** para la confirmación de borrado.
   Reutiliza los mismos estilos de `<dialog>` que ya están en `styles.css`.
4. **Nuevo `<div id="toast">`** para mostrar feedback al guardar / actualizar / eliminar.
5. **`<script src="script.js">`** al final del `<body>`.

> Todas las adiciones están envueltas en comentarios `<!-- AGREGADO POR OSCAR -->` y
> `<!-- /AGREGADO POR OSCAR -->` para que el equipo identifique rápidamente qué es nuevo.

## Comportamiento simulado

| Acción del usuario                       | Operación HTTP simulada            | Feedback visual                          |
|------------------------------------------|------------------------------------|------------------------------------------|
| Llenar form en "Agregar" y dar Guardar   | `POST /tareas` → `201 Created`     | Toast verde + nueva card en su sección   |
| Click en "Editar" de una card            | `PUT /tareas/:id` → `200 OK`       | Abre `<dialog id="edit-modal">` precargado |
| Confirmar edición                        | actualiza la card en el DOM        | Toast azul                                |
| Click en "Eliminar" de una card          | abre `<dialog id="delete-modal">`  | Pide confirmación                         |
| Confirmar eliminación                    | `DELETE /tareas/:id` → `204 No Content` | Card se desvanece + toast rojo       |
| Escribir en la barra de búsqueda         | filtra cards en vivo               | (instantáneo)                             |
| Tecla `Esc`                              | cierra cualquier dialog abierto    | —                                          |

## Cómo correrlo

Abrir `index.html` en cualquier navegador. No requiere servidor ni backend.

## Cómo se conecta esto con el Laboratorio 2 (backend)

La simulación reproduce visualmente los cuatro métodos REST estándar (`POST`,
`GET`, `PUT`, `DELETE`) que expondrá el backend Spring Boot del equipo cuando
exista el controlador de tareas. Hoy el backend solo tiene `/usuarios`, así que
para el Laboratorio 3 (Frontend) la simulación es visual; las llamadas reales
se podrán enchufar fácilmente sustituyendo los `setTimeout` de `script.js` por
`fetch()` al endpoint correspondiente.
