// Christopher: Componente CategoryCards
// Muestra 3 cards para filtrar por categoría: Estudio, Sueño, Bienestar
// Diseño mobile-first: en móvil son 1 columna, en desktop 3 columnas

function CategoryCards({ currentCategory, onCategoryChange, counts }) {
  // Christopher: Definición de las categorías con sus propiedades
  const categories = [
    {
      id: 'study',
      name: 'Tareas de estudio',
      description: 'Gestiona tus actividades académicas',
      color: 'study'
    },
    {
      id: 'sleep',
      name: 'Hábitos de sueño',
      description: 'Controla tu descanso diario',
      color: 'sleep'
    },
    {
      id: 'wellness',
      name: 'Hábitos de bienestar',
      description: 'Cuida tu salud mental',
      color: 'wellness'
    }
  ];

  return (
    <section className="categories-section">
      <h2 className="categories-title">Categorías</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${category.color} ${currentCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <p style={{ marginTop: '12px', fontWeight: '600', color: 'var(--color-sky-connect)' }}>
              {counts[category.id]} tareas
            </p>
          </div>
        ))}
      </div>
      
      {/* Christopher: Botón para ver todas las tareas */}
      <button
        className="btn btn-secondary"
        style={{ marginTop: '16px', width: '100%' }}
        onClick={() => onCategoryChange('all')}
      >
        Ver todas las tareas ({counts.all})
      </button>
    </section>
  );
}

export default CategoryCards;
