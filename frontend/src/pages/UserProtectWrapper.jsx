import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            toast.error('No token found! Redirecting to login...');
            navigate('/login');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                    toast.success('User authenticated successfully!');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                localStorage.removeItem('token');
                toast.error('Authentication failed! Redirecting to login...');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [token, navigate, setUser]);

    if (isLoading) {
        // toast.loading('Authenticating...');
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;