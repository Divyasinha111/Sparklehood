import React from 'react';
import { Incident, IncidentFilters, IncidentSort } from '../types/incident';
import IncidentCard from './IncidentCard';
import { AlertTriangle } from 'lucide-react';

interface IncidentListProps {
  incidents: Incident[];
  filters: IncidentFilters;
  sort: IncidentSort;
  isDarkMode: boolean;
  selectedIncidentId: number | null;
}

const IncidentList: React.FC<IncidentListProps> = ({ 
  incidents, 
  filters, 
  sort,
  isDarkMode,
  selectedIncidentId
}) => {
  // Filter incidents
  const filteredIncidents = incidents.filter((incident) => {
    // Filter by severity
    if (filters.severity !== 'All' && incident.severity !== filters.severity) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        incident.title.toLowerCase().includes(query) ||
        incident.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort incidents
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    
    return sort.dateOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (sortedIncidents.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
      } rounded-lg border border-dashed`}>
        <AlertTriangle size={32} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
        <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          No incidents found
        </h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center mt-1`}>
          {filters.severity !== 'All' || filters.searchQuery
            ? 'Try changing your filters or search query'
            : 'No incidents have been reported yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedIncidents.map((incident) => (
        <IncidentCard 
          key={incident.id} 
          incident={incident} 
          isDarkMode={isDarkMode}
          isHighlighted={incident.id === selectedIncidentId}
        />
      ))}
    </div>
  );
};

export default IncidentList;