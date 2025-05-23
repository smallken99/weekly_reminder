import React from 'react';
import AppComponent from './components/App'; // Renaming to avoid conflict
import './App.css'; // Keep existing App.css import if needed for global styles
import './index.css'; // Make sure Tailwind styles are loaded

function App() {
  return (
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>
  );
}

export default App;
