import React, { useState, useEffect } from 'react';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import NotificationDisplay from './Notification'; // Renamed to avoid conflict with browser Notification API

function AppComponent() {
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (newReminder) => {
    setReminders(prevReminders => [...prevReminders, newReminder]);
  };

  const deleteReminder = (idToDelete) => {
    setReminders(prevReminders => prevReminders.filter(reminder => reminder.id !== idToDelete));
  };

  useEffect(() => {
    const requestPermission = async () => {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      }
    };
    requestPermission();

    const audioAlert = new Audio('/notification.mp3'); 

    const intervalId = setInterval(() => {
      if (notificationPermission !== 'granted') {
        console.log('Notification permission not granted. Visual and sound alerts skipped.');
        return;
      }

      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

      reminders.forEach(reminder => {
        if (reminder.day === currentDay && reminder.time === currentTime) {
          console.log(`Reminder due: ${reminder.message}`);
          
          new Notification('Reminder!', {
            body: reminder.message,
            icon: '/vite.svg',
          });

          audioAlert.play().catch(error => {
            console.error('Error playing sound alert:', error);
          });
        }
      });
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [reminders, notificationPermission]);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-2xl min-h-screen flex flex-col space-y-6">
      <header className="text-center pt-6 pb-4">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Reminder App</h1>
      </header>
      
      <NotificationDisplay /> {/* This is the React component, not the browser API */}
      
      {notificationPermission === 'denied' && (
        <p className="text-red-600 dark:text-red-400 text-center p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-md">
          Notification permissions have been denied. You will not receive visual reminders.
        </p>
      )}
      {notificationPermission !== 'granted' && notificationPermission !== 'denied' && (
         <button 
           onClick={async () => {
             const permission = await Notification.requestPermission();
             setNotificationPermission(permission);
           }}
           className="w-full py-2.5 px-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700"
         >
           Enable Notifications
         </button>
      )}
      
      <ReminderForm addReminder={addReminder} />
      <ReminderList reminders={reminders} deleteReminder={deleteReminder} />

      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Reminder App. Stay organized!</p>
      </footer>
    </div>
  );
}

export default AppComponent;
