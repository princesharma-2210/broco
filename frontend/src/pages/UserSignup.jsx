import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import brocoLogo from '../assets/brocoLogojpg.jpg'; 

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    // Validation functions
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

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };

        try {
            toast.loading('Creating account...');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            toast.dismiss(); // Clear loading toast

            if (response.status === 201) {
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token);
                toast.success('Account created successfully!');
                navigate('/home');
            }
        } catch (error) {
            toast.dismiss(); // Clear loading toast
            toast.error(`Signup failed: ${error.response?.data?.message || error.message}`);
        }

        // Clear input fields
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    };

    return (
        <div>
            <div className='p-7 h-screen flex flex-col justify-between'>
                <div>
                    <img
                        className='w-16 mb-10'
                        src={brocoLogo}
                        alt="Brocomotive Logo"
                    />
                    <form onSubmit={submitHandler}>
                        <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
                        <div className='flex gap-4 mb-7'>
                            <input
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                required
                                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                                type="text"
                                placeholder='Last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

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
                            Create account
                        </button>
                    </form>
                    <p className='text-center'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-blue-600'>
                            Login here
                        </Link>
                    </p>
                </div>
                <div>
                    <p className='text-[10px] leading-tight'>
                        This site is protected by reCAPTCHA and the{' '}
                        <span className='underline'>Google Privacy Policy</span> and{' '}
                        <span className='underline'>Terms of Service apply</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;