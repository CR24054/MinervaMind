import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import '../Styles/Auth.css';

const Login = () => {
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const success = await login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">MinervaMind</h1>
                    <p className="auth-subtitle">Bienvenido de nuevo</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Correo Electrónico</label>
                        <div className="input-wrapper">
                            <div className="input-icon">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contraseña</label>
                        <div className="input-wrapper">
                            <div className="input-icon">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="auth-button"
                    >
                        {loading ? 'Iniciando sesión...' : (
                            <>
                                Entrar <LogIn size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="auth-link">
                            Regístrate <ArrowRight size={12} />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
