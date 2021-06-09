import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../Layout';

import Styles from '../../styles/screens/forgotPasswordScreen.module.css';


function ForgotPasswordScreen({ history }) {
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post('/api/auth/forgot-password', { email }, config);

            setSuccess('Email Sent');

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <Layout>
            <div>
                <form onSubmit={resetPasswordHandler}>
                    <h3>Login</h3>
                    {error && <span>{error}</span>}
                    {success && <span>{success}</span>}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email" placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>

                    <button type="submit" >Send Reset Link</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPasswordScreen;
