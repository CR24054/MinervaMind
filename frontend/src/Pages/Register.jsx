import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { User, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import '../Styles/Auth.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const isSuccess = await register(username, email, password);
        if (isSuccess) {
            setSuccess('Cuenta creada exitosamente. Redirigiendo...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError('Error al crear la cuenta. Es posible que el email ya exista.');
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title" style={{backgroundImage: 'linear-gradient(to right, #34d399, #2dd4bf)'}}>
                        Crear Cuenta
                    </h1>
                    <p className="auth-subtitle">Únete a MinervaMind</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Nombre de Usuario</label>
                        <div className="input-wrapper">
                            <div className="input-icon">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="auth-input register-input"
                                placeholder="usuario123"
                            />
                        </div>
                    </div>

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
                                className="auth-input register-input"
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
                                className="auth-input register-input"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !!success}
                        className="auth-button register-button"
                    >
                        {loading ? 'Procesando...' : (
                            <>
                                Registrarse <UserPlus size={16} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        <Link to="/login" className="auth-link register-link back-link">
                            <ArrowLeft size={12} /> Volver al Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
