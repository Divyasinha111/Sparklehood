import React from 'react';
import { ShieldAlert, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-indigo-700'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <ShieldAlert className={`h-10 w-10 ${isDarkMode ? 'text-gray-300' : 'text-indigo-200'} mr-3 group-hover:scale-110 transition-transform`} />
            <div>
              <h1 className="text-2xl font-bold">AI Safety Incident Dashboard</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-indigo-200'} text-sm`}>
                Monitor and report AI safety incidents
              </p>
            </div>
          </Link>
          
          <button
            onClick={onThemeToggle}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-indigo-600 text-indigo-200'
            } transition-colors`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;