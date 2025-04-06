import React from 'react';
import { toast } from 'react-hot-toast';

const VehiclePanel = (props) => {
    // Handle vehicle selection with notification
    const handleSelectVehicle = (vehicleType) => {
        try {
            if (!props.fare[vehicleType]) {
                throw new Error('Fare data for the selected vehicle is missing!');
            }
            props.setConfirmRidePanel(true);
            props.selectVehicle(vehicleType);
            toast.success(`${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} selected successfully!`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Validate props
    if (!props.fare) {
        toast.error('Fare information is missing!');
        return null;
    }

    return (
        <div>
            <h5
                className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setVehiclePanel(false);
                    toast.error('Vehicle selection cancelled!');
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Delivery hai?
            #HoJayega!</h3>
            <div
                onClick={() => handleSelectVehicle('car')}
                className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
            >
                <img
                    className='h-20'
                    src="https://dom-website-prod-cdn-cms.porter.in/Pn_M_56aa8e7af2_4b05aeef37.webp"
                    alt="Packers and Movers"
                />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>
                    Packers and Movers <span><i className="ri-box-line text-2xl"></i>4</span>
                    </h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
            </div>
            <div
                onClick={() => handleSelectVehicle('moto')}
                className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
            >
                <img
                    className='h-20'
                    src="https://dom-website-prod-cdn-cms.porter.in/2_wheelers_274869b2af_7262e4dde4.webp"
                    alt="Moto"
                />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>
                        Moto <span><i className="ri-user-3-fill"></i>1</span>
                    </h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
            </div>
            <div
                onClick={() => handleSelectVehicle('auto')}
                className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
            >
                <img
                    className='h-20'
                    src="https://dom-website-prod-cdn-cms.porter.in/trucks_293a94a860_cc4b2d6d06.webp"
                    alt="Auto"
                />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>
                        UberAuto <span><i className="ri-user-3-fill"></i>3</span>
                    </h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;