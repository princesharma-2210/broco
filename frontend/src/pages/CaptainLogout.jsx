import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token');
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    localStorage.removeItem('captain-token');
                    toast.success('Logged out successfully!');
                    navigate('/captain-login');
                }
            } catch (error) {
                toast.error(`Logout failed: ${error.response?.data?.message || error.message}`);
            }
        };

        handleLogout();
    }, [token, navigate]);

    return <div>Logging out...</div>;
};

export default CaptainLogout;