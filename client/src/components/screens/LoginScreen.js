import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from '../../styles/screens/loginScreen.module.css';
import Layout from '../Layout';


function LoginScreen({ history }) {
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post('/api/auth/login', { email, password }, config);

            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <Layout>
            <form onSubmit={loginHandler}>
                <h3 className="form-heading">Login</h3>
                {error && <span>{error}</span>}
                <div className="form-row">
                    <div className="input-field">
                        <input
                            type="email"
                            id="email" className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="password" className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" >Login</button>
                    <p>Not having an account? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </Layout>
    )
}

export default LoginScreen;
