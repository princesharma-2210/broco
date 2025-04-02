import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import brocoLogo from '../assets/brocoLogojpg.jpg'; 

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Example: Password must be at least 6 characters
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        const userData = {
            email: email,
            password: password,
        };

        try {
            toast.loading('Logging in...');

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                userData
            );

            toast.dismiss(); // Clear loading toast

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                toast.success('Login successful!');
                navigate('/home');
            }
        } catch (error) {
            toast.dismiss(); // Clear loading toast
            toast.error(
                `Login failed: ${error.response?.data?.message || error.message}`
            );
        }

        // Clear input fields after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-16 mb-10'
                    src={brocoLogo}
                    alt="Uber Logo"
                />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='password'
                    />

                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <p className='text-center'>
                    New here?{' '}
                    <Link to='/signup' className='text-blue-600'>
                        Create new Account
                    </Link>
                </p>
            </div>
            <div>
                <Link
                    to='/captain-login'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;