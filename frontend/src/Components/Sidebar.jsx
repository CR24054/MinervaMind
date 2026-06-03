import '../Styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">  MinervaMind</div>
      <div className="sidebar-menu">
        <h1>Aquí estará el menú</h1>
        <p style={{color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginTop: '10px'}}>
          agregar opciones para menu y tambien carnet del estudiante, tambien se podra navegar 
        </p>
      </div>
      <div className="sidebar-profile">
        Perfil del Estudiante
      </div>
    </aside>
  );
}
