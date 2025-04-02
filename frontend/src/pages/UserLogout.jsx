import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            if (!token) {
                toast.error('No token found! Redirecting to login.');
                navigate('/login');
                return;
            }

            try {
                toast.loading('Logging out...');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.dismiss(); // Clear loading toast

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    toast.success('Logged out successfully!');
                    navigate('/login');
                }
            } catch (error) {
                toast.dismiss(); // Clear loading toast
                toast.error(`Logout failed: ${error.response?.data?.message || error.message}`);
            }
        };

        handleLogout();
    }, [token, navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;