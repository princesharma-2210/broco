import React from 'react';
import { toast } from 'react-hot-toast';

const LocationSearchPanel = ({
    suggestions,
    setVehiclePanel,
    setPanelOpen,
    setPickup,
    setDestination,
    activeField,
}) => {
    const handleSuggestionClick = (suggestion) => {
        try {
            if (activeField === 'pickup') {
                setPickup(suggestion);
                toast.success(`Pickup location set to ${suggestion}`);
            } else if (activeField === 'destination') {
                setDestination(suggestion);
                toast.success(`Destination set to ${suggestion}`);
            }
            // Uncomment if needed:
            // setVehiclePanel(true);
            // setPanelOpen(false);
        } catch (error) {
            toast.error(`Error setting location: ${error.message}`);
        }
    };

    return (
        <div>
            {/* Display fetched suggestions */}
            {suggestions.length > 0 ? (
                suggestions.map((elem, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSuggestionClick(elem)}
                        className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                    >
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className='ri-map-pin-fill'></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            ) : (
                <p className='text-gray-500'>No suggestions available</p>
            )}
        </div>
    );
};

export default LocationSearchPanel;