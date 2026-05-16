# MinervaMind - Frontend

## Descripción
Frontend de MinervaMind construido con React + Vite.

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Header con título
│   │   ├── CategoryCards.jsx  # Cards de categorías (Estudio, Sueño, Bienestar)
│   │   ├── TaskList.jsx       # Lista de tareas con CRUD
│   │   └── TaskForm.jsx       # Formulario para crear/editar
│   ├── App.jsx                # Componente principal con lógica CRUD
│   ├── App.css                # Estilos con tokens Headspace
│   └── main.jsx               # Entry point
├── index.html
└── package.json
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para producción

```bash
npm run build
```

## Diseño

- **Mobile First**: Diseñado primero para móvil (320px+)
- **Colores**: Paleta pastel inspirada en Headspace
- **Responsive**: Adaptable a desktop (breakpoint 768px)
- **Componentes**: Cards redondeadas, sombras sutiles, tipografía limpia

## CRUD Implementado

- **GET**: Visualización de tareas por categoría
- **POST**: Crear nueva tarea/hábito
- **PUT**: Editar tarea existente
- **DELETE**: Eliminar tarea

## Datos

Usa mock data inicial. Para conectar con backend, modificar las funciones en App.jsx.

## Autor

Christopher - Diseño e implementación frontend
Oscar - Mock data e interacciones visuales (confirmaciones, feedback)
