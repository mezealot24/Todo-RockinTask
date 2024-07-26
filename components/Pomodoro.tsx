'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds

const Pomodoro: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(POMODORO_TIME);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      toast.success('Pomodoro session completed!');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

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