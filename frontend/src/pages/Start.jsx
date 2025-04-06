import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import broLogo from '../assets/brologo.png'; 
import bgVideo from '../assets/broback.mp4'; 

const Start = () => {
  const handleNavigation = () => {
    toast.success('Redirecting to login...');
  };
  
  return (
    <div>
      <div className='relative h-screen w-full flex justify-between flex-col pt-9'>
         {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            className='absolute top-0 left-0 w-full h-full object-cover -z-10'
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        <img
          className='w-40 ml-10 max-w-full h-auto object-cover'
          src={broLogo} alt="Brocomotive Logo"
        />
        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>Get Started with Brocomotive</h2>
          <Link
            to='/login'
            className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'
            onClick={handleNavigation}
            aria-label="Continue to login"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;