import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { toast } from 'react-hot-toast';

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {}; // Retrieve ride data from location state
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!ride) {
            toast.error('Ride data is missing! Redirecting to home.');
            navigate('/home'); // Redirect to home if no ride data is provided
        }
    }, [ride, navigate]);

    useEffect(() => {
        const handleRideEnded = () => {
            toast.success('Ride has ended. Redirecting to home.');
            navigate('/home');
        };

        socket.on('ride-ended', handleRideEnded);

        // Cleanup socket listener on component unmount
        return () => {
            socket.off('ride-ended', handleRideEnded);
        };
    }, [socket, navigate]);

    return (
        <div className='h-screen'>
            {/* Home Button */}
            <Link
                to='/home'
                className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'
                aria-label="Go to home"
            >
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* Live Tracking */}
            <div className='h-1/2'>
                <LiveTracking />
            </div>

            {/* Ride Details */}
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img
                        className='h-12'
                        src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-Brocox-take.jpg"
                        alt="Vehicle"
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname || 'Unknown Captain'}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate || 'Unknown Plate'}</h4>
                        <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.model || 'Vehicle Model Unknown'}</p>
                    </div>
                </div>

                {/* Destination and Fare Information */}
                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.pickup || 'Pickup Address Unknown'}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination || 'Destination Address Unknown'}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare || 'Fare Unknown'}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <button
                    className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
                    aria-label="Make a Payment"
                >
                    Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;