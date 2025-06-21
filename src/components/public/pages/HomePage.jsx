import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [endTime] = useState(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = (time) => {
    return String(time).padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-10 bg-gray-800 rounded-lg shadow-2xl max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-4">We're Launching Soon!</h1>
        <p className="text-lg mb-8 text-gray-300">Our new website is on its way. Stay tuned for something amazing.</p>
        <div className="flex justify-center items-center text-4xl font-mono bg-gray-700 p-4 rounded-lg">
          {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
            <div className="text-5xl">
              <span>{formatTime(timeLeft.hours)}</span>:
              <span>{formatTime(timeLeft.minutes)}</span>:
              <span>{formatTime(timeLeft.seconds)}</span>
            </div>
          ) : (
            <span>Time's up!</span>
          )}
        </div>
        <p className="mt-8 text-sm text-gray-400">Follow us on social media for updates!</p>
      </div>
    </div>
  );
};

export default HomePage;