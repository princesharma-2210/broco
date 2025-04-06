import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { toast } from 'react-hot-toast';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            },
            (error) => {
                toast.error(`Error getting location: ${error.message}`);
            }
        );

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            },
            (error) => {
                toast.error(`Error watching location: ${error.message}`);
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                    // toast.success('Position updated!');
                },
                (error) => {
                    toast.error(`Error updating position: ${error.message}`);
                }
            );
        };

        updatePosition(); // Initial position update
        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={15}>
                    <Marker position={currentPosition} />
                </GoogleMap>
            </LoadScript>
            <div>
                <button onClick={() => toast.success('Test notification')}>Test Toast</button>
            </div>
        </>
    );
};

export default LiveTracking;