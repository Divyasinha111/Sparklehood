import React from 'react';
import { Menu } from '@headlessui/react';
import { Filter, SortDesc, SortAsc, PlusCircle, Search, ShieldAlert, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IncidentFilters, IncidentSort } from '../types/incident';

interface NavbarProps {
  filters: IncidentFilters;
  sort: IncidentSort;
  onFilterChange: (filters: IncidentFilters) => void;
  onSortChange: (sort: IncidentSort) => void;
  onNewIncident: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  filters,
  sort,
  onFilterChange,
  onSortChange,
  onNewIncident,
  isDarkMode,
  onThemeToggle,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-indigo-700'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Logo and Title */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <ShieldAlert className={`h-8 w-8 ${isDarkMode ? 'text-gray-300' : 'text-indigo-200'} mr-3 group-hover:scale-110 transition-transform`} />
              <div>
                <h1 className="text-xl font-bold">AI Safety Incident</h1>
              </div>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex flex-1 items-center justify-between sm:justify-end gap-4 flex-wrap">
            <div className="flex items-center space-x-4 flex-wrap">
              {/* Filter Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className={`flex items-center px-3 py-2 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600'} transition-colors`}>
                  <Filter size={18} className="mr-2" />
                  Filter by Severity
                </Menu.Button>
                <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
                  {['All', 'Low', 'Medium', 'High'].map((severity) => (
                    <Menu.Item key={severity}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } ${
                            filters.severity === severity ? 'bg-indigo-50 text-indigo-600' : ''
                          } block w-full text-left px-4 py-2`}
                          onClick={() => onFilterChange({ ...filters, severity: severity as IncidentFilters['severity'] })}
                        >
                          {severity}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>

              {/* Sort Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className={`flex items-center px-3 py-2 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600'} transition-colors`}>
                  {sort.dateOrder === 'newest' ? (
                    <SortDesc size={18} className="mr-2" />
                  ) : (
                    <SortAsc size={18} className="mr-2" />
                  )}
                  Sort by Date
                </Menu.Button>
                <Menu.Items className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} ${
                          sort.dateOrder === 'newest' ? 'bg-indigo-50 text-indigo-600' : ''
                        } block w-full text-left px-4 py-2`}
                        onClick={() => onSortChange({ dateOrder: 'newest' })}
                      >
                        Newest First
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100' : ''} ${
                          sort.dateOrder === 'oldest' ? 'bg-indigo-50 text-indigo-600' : ''
                        } block w-full text-left px-4 py-2`}
                        onClick={() => onSortChange({ dateOrder: 'oldest' })}
                      >
                        Oldest First
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              {/* Search Bar */}
              <div className="relative">
                <div className={`flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-600'} rounded-md px-3 py-2`}>
                  <Search size={18} className={isDarkMode ? 'text-gray-300' : 'text-indigo-200'} />
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    value={filters.searchQuery}
                    onChange={handleSearchChange}
                    className="ml-2 bg-transparent text-white placeholder-gray-300 focus:outline-none w-40 sm:w-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Report New Incident Button */}
              <button
                onClick={onNewIncident}
                className={`flex items-center px-4 py-2 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-50'
                } rounded-md transition-colors`}
              >
                <PlusCircle size={18} className="mr-2" />
                Report New Incident
              </button>

              {/* Theme Toggle */}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;