import LoginComp from "../Components/LoginComponent";
import '../Styles/LoginPage.css'

function LoginPage(){
    return(
        <div className="login-page-container">
            <h2>Página de Login (Contenedor Principal)</h2>
            <LoginComp />
        </div>
    )
}

export default LoginPage;