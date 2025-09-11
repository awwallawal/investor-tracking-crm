
import React, { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; // Fallback for local development if not set
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundShape1}></div>
      <div style={styles.backgroundShape2}></div>
      
      <div style={styles.cardWrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
              </svg>
            </div>
            <h2 style={styles.title}>Welcome back</h2>
            <p style={styles.subtitle}>Sign in to your account</p>
          </div>
          
          {error && <p style={styles.error}>{error}</p>}
          
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={styles.input}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div style={styles.options}>
              <div style={styles.rememberMe}>
                <input id="remember" name="remember" type="checkbox" style={styles.checkbox} />
                <label htmlFor="remember" style={styles.checkboxLabel}>Remember me</label>
              </div>
              <a href="#" style={styles.forgotPassword}>Forgot password?</a>
            </div>
            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div style={styles.signupContainer}>
            <span style={styles.signupText}>Don't have an account?</span>
            <a href="#" style={styles.signupLink}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS styles object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: 'linear-gradient(to bottom right, #bfdbfe, #c4b5fd, #fecdd3)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    padding: '1rem',
    width: '100vw',
  },
  backgroundShape1: {
    position: 'absolute',
    top: '-6rem',
    left: '-6rem',
    width: '24rem',
    height: '24rem',
    borderRadius: '9999px',
    backgroundColor: '#60a5fa',
    opacity: 0.3,
    filter: 'blur(3rem)',
    pointerEvents: 'none',
  },
  backgroundShape2: {
    position: 'absolute',
    top: '10rem',
    right: '0',
    width: '18rem',
    height: '18rem',
    borderRadius: '9999px',
    backgroundColor: '#f87171',
    opacity: 0.4,
    filter: 'blur(2rem)',
    pointerEvents: 'none',
  },
  cardWrapper: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '28rem',
    margin: 'auto',
  },
  card: {
    backdropFilter: 'blur(16px)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  iconContainer: {
    width: '4rem',
    height: '4rem',
    borderRadius: '9999px',
    background: 'linear-gradient(to bottom right, #60a5fa, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginBottom: '1rem',
  },
  icon: {
    width: '2rem',
    height: '2rem',
    color: '#fff',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#60a5fa',
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    color: '#1d4ed8',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  input: {
    width: 'inherit',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #bfdbfe',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#1e3a8a',
    transition: 'all 0.2s',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    height: '1rem',
    width: '1rem',
    borderRadius: '0.25rem',
    color: '#2563eb',
    border: '1px solid #93c5fd',
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
    display: 'block',
    fontSize: '0.875rem',
    color: '#2563eb',
  },
  forgotPassword: {
    fontSize: '0.875rem',
    color: '#3b82f6',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  button: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  signupContainer: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  signupText: {
    color: '#93c5fd',
    fontSize: '0.875rem',
  },
  signupLink: {
    color: '#2563eb',
    fontSize: '0.875rem',
    fontWeight: '600',
    textDecoration: 'none',
    marginLeft: '0.25rem',
    transition: 'all 0.2s',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

export default LoginPage;
