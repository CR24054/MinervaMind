import './App.css'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'

function App() {
  return (
    // Aqui se llamara si hay login o no hay login, en caso de que haya login se mandara a home
    // Si trabajaras en una pagina en especifico, cambia homepage y cambialo por la que modificaras
    <>
       <HomePage />
    </>
  )
}

export default App
