import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Styles from '../../styles/screens/loginScreen.module.css';


function LoginScreen({ history }) {
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            history.push('/');
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        try {
            const {data} = await axios.post('/api/auth/login', { email, password }, config);

            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch(error) {
            setError(error.response.data.error);
            setTimeout(()=>{
                setError('');
            }, 5000);
        }
    }

    return (
        <div>
            <form onSubmit={loginHandler}>
                <h3>Login</h3>
                {error && <span>{error}</span>}
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

                <button type="submit" >Login</button>
                <span>Not having an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default LoginScreen;
