import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            toast.error('No token found! Redirecting to login.');
            navigate('/captain-login');
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                    toast.success('Authentication successful!');
                }
            })
            .catch((error) => {
                localStorage.removeItem('token');
                toast.error(
                    `Authentication failed: ${
                        error.response?.data?.message || 'Please log in again.'
                    }`
                );
                navigate('/captain-login');
            });
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        // toast.loading('Authenticating...');
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;