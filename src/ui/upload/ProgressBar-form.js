import React, { useState, useEffect } from 'react';

function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newProgress;
            });
        }, 1000); // Her saniye 10'ar artacak şekilde ayarlandı. İhtiyaca göre değiştirilebilir.

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-gray-400 w-full h-5 mt-3 rounded-full '>
            <div className=' bg-primary h-5 rounded-full text-[13px] text-white' 
                style={{ width: `${progress}%` }}>
                {`${progress}%`}
            </div>
        </div>
    );
}

export default ProgressBar;
