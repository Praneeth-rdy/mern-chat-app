import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from '../../styles/screens/registerScreen.module.css';
import Layout from '../Layout';


function RegisterScreen({ history }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword('');
            setConfirmPassword('');
            // setTimeout is async
            setTimeout(() => {
                setError('');
            }, 5000);
            return setError('Passwords do not match');
        }

        try {
            const { data } = await axios.post('/api/auth/register', { username, email, password }, config);

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
            <form onSubmit={registerHandler}>
                <h1 className="form-heading">Register</h1>
                {error && <span>{error}</span>}
                <div className="form-row">
                    <div className="input-field">
                        <input
                            type="text"
                            id="name" className="form-control"

                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                        <label htmlFor="name">Username</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="email"
                            id="email" className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-field">
                        <input
                            type="password"
                            id="password" className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            id="confirmPassword" className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                </div>
                <div className="form-footer">
                    <button type="submit" >Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </Layout>
    )
}

export default RegisterScreen;
