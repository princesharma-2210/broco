import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import { toast } from 'react-hot-toast';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Extracting rideData from location state
    const rideData = location.state?.ride;

    // Validation: If rideData is missing, redirect to the home page
    useEffect(() => {
        if (!rideData) {
            toast.error('No ride data found! Redirecting to home.');
            navigate('/captain-home');
        }
    }, [rideData, navigate]);

    // GSAP animation for finish ride panel
    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' });
        } else {
            gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' });
        }
    }, [finishRidePanel]);

    // Handlers
    const handleFinishRidePanel = () => {
        setFinishRidePanel(true);
        toast.success('Finish ride panel opened!');
    };

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            {/* Header */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img
                    className='w-16'
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <Link
                    to='/captain-home'
                    className='h-10 w-10 bg-white flex items-center justify-center rounded-full'
                    aria-label="Logout to captain home"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Ride Status */}
            <div
                className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                onClick={handleFinishRidePanel}
            >
                <h5
                    className='p-1 text-center w-[90%] absolute top-0'
                    aria-label="Show Finish Ride Panel"
                >
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
                <button
                    className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'
                    onClick={handleFinishRidePanel}
                    aria-label="Complete Ride"
                >
                    Complete Ride
                </button>
            </div>

            {/* Finish Ride Panel */}
            <div
                ref={finishRidePanelRef}
                className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
            >
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

            {/* Live Tracking */}
            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>
        </div>
    );
};

export default CaptainRiding;