import React, { useState } from 'react';

function ReminderForm({ addReminder }) {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || !message) {
      alert('Please fill in time and message for the reminder.'); // Basic validation
      return;
    }
    addReminder({
      id: Date.now(),
      day,
      time,
      message,
    });
    setDay('Monday');
    setTime('');
    setMessage('');
  };

  const inputBaseClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white";
  const labelBaseClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Add New Reminder</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="day" className={labelBaseClasses}>Day of the week:</label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={`${inputBaseClasses} appearance-none`} // appearance-none for custom arrow if desired later
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
              <option key={d} value={d} className="dark:bg-gray-700 dark:text-white">{d}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="time" className={labelBaseClasses}>Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputBaseClasses}
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className={labelBaseClasses}>Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., Meeting with team"
            className={inputBaseClasses}
            required
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full py-2.5 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-150"
      >
        Add Reminder
      </button>
    </form>
  );
}

export default ReminderForm;
