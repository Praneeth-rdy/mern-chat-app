import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from '../../styles/screens/registerScreen.module.css';


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
            header: {
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
        <div>
            <form onSubmit={registerHandler}>
                <h3>Register</h3>
                {error && <span>{error}</span>}
                <div>
                    <label htmlFor="name">Username:</label>
                    <input
                        type="text"
                        id="name" placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email" placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password" placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword" placeholder="Enter Password Again"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                </div>

                <button type="submit" >Register</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default RegisterScreen;
