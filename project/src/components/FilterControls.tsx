import React from 'react';
import { Filter, SortDesc, SortAsc, Search } from 'lucide-react';
import { IncidentFilters, IncidentSort } from '../types/incident';

interface FilterControlsProps {
  filters: IncidentFilters;
  sort: IncidentSort;
  onFilterChange: (filters: IncidentFilters) => void;
  onSortChange: (sort: IncidentSort) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  filters, 
  sort, 
  onFilterChange, 
  onSortChange 
}) => {
  const handleSeverityChange = (severity: IncidentFilters['severity']) => {
    onFilterChange({ ...filters, severity });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const toggleDateSort = () => {
    onSortChange({ 
      dateOrder: sort.dateOrder === 'newest' ? 'oldest' : 'newest' 
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium">Filter by Severity</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Low', 'Medium', 'High'].map((severity) => (
              <button
                key={severity}
                onClick={() => handleSeverityChange(severity as IncidentFilters['severity'])}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  filters.severity === severity
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Search size={16} className="text-gray-500" />
            <span className="text-sm font-medium">Search Incidents</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 md:flex-initial">
          <div className="flex items-center gap-2 mb-2">
            {sort.dateOrder === 'newest' ? (
              <SortDesc size={16} className="text-gray-500" />
            ) : (
              <SortAsc size={16} className="text-gray-500" />
            )}
            <span className="text-sm font-medium">Sort by Date</span>
          </div>
          <button
            onClick={toggleDateSort}
            className="w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            {sort.dateOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;