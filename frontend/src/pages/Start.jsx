// import React from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import broLogo from '../assets/brologo.png'; 
// import bgVideo from '../assets/broback.mp4'; 

// const Start = () => {
//   const handleNavigation = () => {
//     toast.success('Redirecting to login...');
//   };

//   return (
//     <div>
//       <div className='relative h-screen w-full flex justify-between flex-col pt-9'>
//          {/* Background Video */}
//           <video
//             autoPlay
//             loop
//             muted
//             className='absolute top-0 left-0 w-full h-full object-cover -z-10'
//           >
//             <source src={bgVideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         <img
//           className='w-40 ml-10 max-w-full h-auto object-cover'
//           src={broLogo} alt="Brocomotive Logo"
//         />
//         <div className='bg-white pb-8 py-4 px-4'>
//           <h2 className='text-[30px] font-semibold'>Get Started with Brocomotive</h2>
//           <Link
//             to='/login'
//             className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'
//             onClick={handleNavigation}
//             aria-label="Continue to login"
//           >
//             Continue
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Start;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import bgVideo from '../assets/broback.mp4';
import brocoLogo from "../assets/brocoLogojpg.jpg"

const Start = () => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true);
  }, []);
  
  const handleNavigation = () => {
    toast.success('Redirecting to login...', { 
      icon: '',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Logo Section with Animation */}
        <img className='w-16 absolute left-5 top-5' src={brocoLogo} alt="" />
        {/* <div className={`pt-8 px-8 transition-all duration-700 ${animateIn ? 'opacity-100' : 'opacity-0 -translate-y-10'}`}>
          <div className="w-48 h-48 flex items-center justify-center bg-white bg-opacity-90 rounded-full shadow-xl p-4">
            <img
              className="max-w-full h-auto object-contain"
              src={brocoLogo}
              alt="Brocomotive Logo"
            />
          </div>
        </div> */}
        
        {/* Empty middle space */}
        <div></div>
        
        {/* Welcome Card */}
        <div className={`transition-all duration-700 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-4 mb-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-800 py-2 px-6">
              <h1 className="text-white text-lg font-medium">BROCOMOTIVE</h1>
            </div>
            
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome to the Brocomotive</h2>
              <p className="text-gray-600 mb-6">Your journey to automotive excellence starts here.</p>
              
              <Link
                to="/login"
                className="flex items-center justify-center w-full bg-black text-white py-4 rounded-lg font-medium text-lg transition-all hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none"
                onClick={handleNavigation}
                aria-label="Continue to login"
              >
                GET STARTED
              </Link>
              
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">
                  New to Brocomotive? <Link to="/signup" className="text-blue-600 font-medium">Sign up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;