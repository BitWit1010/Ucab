import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', password: '', phone: '', role: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await register(form);
            if (data.role === 'driver') navigate('/driver-dashboard');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card slide-up">
                <h2>Create account</h2>
                <p className="auth-subtitle">Join Ucab and start booking rides</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name" type="text" name="name" className="form-control"
                                placeholder="John Doe" value={form.name} onChange={handleChange} required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone" type="tel" name="phone" className="form-control"
                                placeholder="+91 9876543210" value={form.phone} onChange={handleChange} required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            id="reg-email" type="email" name="email" className="form-control"
                            placeholder="you@example.com" value={form.email} onChange={handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <input
                            id="reg-password" type="password" name="password" className="form-control"
                            placeholder="Min. 6 characters" value={form.password} onChange={handleChange}
                            minLength={6} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">I want to</label>
                        <select id="role" name="role" className="form-control" value={form.role} onChange={handleChange}>
                            <option value="user">Ride (Passenger)</option>
                            <option value="driver">Drive (Driver)</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
