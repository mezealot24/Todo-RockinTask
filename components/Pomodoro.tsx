'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            toast.success('Pomodoro session completed!');
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-primary p-4 rounded-lg mb-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Pomodoro Timer</h2>
      <div className="text-3xl sm:text-4xl font-bold mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={toggleTimer}
          className="bg-secondary text-white px-3 sm:px-4 py-2 rounded hover:bg-opacity-80 text-sm sm:text-base"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-opacity-80 text-sm sm:text-base"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;