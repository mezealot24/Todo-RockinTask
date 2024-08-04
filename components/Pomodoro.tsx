// Pomodoro.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

interface PomodoroProps {
  onComplete: () => void;
  selectedTodoId: number | null;
}

const Pomodoro: React.FC<PomodoroProps> = ({ onComplete, selectedTodoId }) => {
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const startTimer = useCallback(() => {
    if (selectedTodoId) {
      setIsActive(true);
    } else {
      toast.error('Please select a task first');
    }
  }, [selectedTodoId]);

  const pauseTimer = () => setIsActive(false);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(POMODORO_TIME);
    setMode('pomodoro');
    setPomodoroCount(0);
  }, []);

  const completePomodoro = useCallback(() => {
    onComplete();
    resetTimer();
  }, [onComplete, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'pomodoro') {
        const newCount = pomodoroCount + 1;
        setPomodoroCount(newCount);
        if (newCount % 4 === 0) {
          toast.success('Time for a long break!');
          setTimeLeft(LONG_BREAK_TIME);
          setMode('longBreak');
        } else {
          toast.success('Time for a short break!');
          setTimeLeft(SHORT_BREAK_TIME);
          setMode('shortBreak');
        }
      } else {
        toast.success('Break time is over. Back to work!');
        setTimeLeft(POMODORO_TIME);
        setMode('pomodoro');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, pomodoroCount]);

  useEffect(() => {
    if (selectedTodoId) {
      resetTimer();
    }
  }, [selectedTodoId, resetTimer]);

  return (
    <div className="bg-primary p-4 rounded-lg mb-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Pomodoro Timer</h2>
      <div className="text-3xl sm:text-4xl font-bold mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="mb-2">Mode: {mode}</div>
      <div className="mb-4">Pomodoros completed: {pomodoroCount}</div>
      <div className="flex space-x-2">
        <button
          onClick={isActive ? pauseTimer : startTimer}
          className="bg-secondary text-white px-3 sm:px-4 py-2 rounded hover:bg-opacity-80 text-sm sm:text-base"
          disabled={!selectedTodoId}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-opacity-80 text-sm sm:text-base"
        >
          Reset
        </button>
        <button
          onClick={completePomodoro}
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-opacity-80 text-sm sm:text-base"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;