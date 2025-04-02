import React, { useContext, useEffect } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';
import toast from 'react-hot-toast';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    
    // Ensure captain object and required fields exist
    const firstName = captain?.fullname?.firstname || '';
    const lastName = captain?.fullname?.lastname || '';
    const earnings = captain?.earnings ?? 295.20; // Default value
    const onlineHours = captain?.stats?.onlineHours ?? 0; // Default to 0 if undefined
    const completedTrips = captain?.stats?.completedTrips ?? 0;
    const rating = captain?.stats?.rating ?? 'N/A';

    useEffect(() => {
        if (!firstName || !lastName) {
            toast.error('Captain name is missing!');
        }
        if (!captain?.profilePic) {
            toast.warning('Captain profile picture is missing!');
        }
    }, [captain]);

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' 
                         src={captain?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"} 
                         alt="Captain Profile" />
                    <h4 className='text-lg font-medium capitalize'>{firstName && lastName ? `${firstName} ${lastName}` : 'Unknown Captain'}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹{earnings.toFixed(2)}</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>{onlineHours}</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>{completedTrips}</h5>
                    <p className='text-sm text-gray-600'>Trips Completed</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>{rating}</h5>
                    <p className='text-sm text-gray-600'>Rating</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;