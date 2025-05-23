import React from 'react';

function ReminderList({ reminders, deleteReminder }) {
  if (!reminders || reminders.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No reminders yet</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new reminder using the form above to get started!</p>
      </div>
    );
  }

  const groupedReminders = reminders.reduce((acc, reminder) => {
    acc[reminder.day] = acc[reminder.day] || [];
    acc[reminder.day].push(reminder);
    return acc;
  }, {});

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Your Reminders</h2>
      {daysOrder.map(day => {
        if (!groupedReminders[day] || groupedReminders[day].length === 0) {
          return null; 
        }
        
        return (
          <section key={day} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 capitalize text-indigo-600 dark:text-indigo-400 border-b border-gray-200 dark:border-gray-700 pb-3">
              {day}
            </h3>
            <ul className="space-y-3">
              {groupedReminders[day]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(reminder => (
                  <li 
                    key={reminder.id} 
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between sm:items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    <div className="mb-2 sm:mb-0">
                      <span className="block text-lg font-medium text-gray-800 dark:text-gray-100">{reminder.time}</span>
                      <span className="block text-sm text-gray-600 dark:text-gray-300">{reminder.message}</span>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="self-start sm:self-center ml-auto sm:ml-4 px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-150"
                      aria-label={`Delete reminder: ${reminder.message} at ${reminder.time} on ${reminder.day}`}
                    >
                      Delete
                    </button>
                  </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export default ReminderList;
