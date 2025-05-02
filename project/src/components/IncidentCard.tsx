import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Incident } from '../types/incident';
import { formatDate } from '../utils/dateUtils';

interface IncidentCardProps {
  incident: Incident;
  isDarkMode: boolean;
  isHighlighted?: boolean;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, isDarkMode, isHighlighted }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return isDarkMode 
          ? 'bg-green-900 text-green-200 border-green-800'
          : 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return isDarkMode
          ? 'bg-yellow-900 text-yellow-200 border-yellow-800'
          : 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High':
        return isDarkMode
          ? 'bg-red-900 text-red-200 border-red-800'
          : 'bg-red-100 text-red-800 border-red-200';
      default:
        return isDarkMode
          ? 'bg-gray-800 text-gray-200 border-gray-700'
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRecommendations = (severity: string) => {
    switch (severity) {
      case 'High':
        return [
          "Immediately escalate to senior management",
          "Form an incident response team",
          "Document all actions taken",
          "Prepare external communication if needed",
          "Review and update safety protocols"
        ];
      case 'Medium':
        return [
          "Investigate root cause within 24 hours",
          "Implement temporary safeguards",
          "Monitor for similar patterns",
          "Update relevant documentation"
        ];
      case 'Low':
        return [
          "Document the incident details",
          "Monitor for recurrence",
          "Review during next safety meeting",
          "Update best practices if needed"
        ];
      default:
        return [];
    }
  };

  return (
    <div 
      id={`incident-${incident.id}`}
      className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isHighlighted ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-3">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {incident.title}
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
              {incident.severity}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(incident.reported_at)}
            </span>
          </div>
        </div>
        <button
          onClick={toggleExpand}
          className={`flex items-center justify-center px-3 py-1 text-sm ${
            isDarkMode 
              ? 'text-indigo-400 border-indigo-400 hover:bg-indigo-900' 
              : 'text-indigo-600 border-indigo-600 hover:bg-indigo-50'
          } border rounded-md transition-colors duration-200 self-start sm:self-center`}
        >
          {isExpanded ? (
            <>
              <span className="mr-1">Hide Details</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span className="mr-1">View Details</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className={`border-t ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} animate-fadeIn`}>
          <div className="p-4">
            <h4 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Description</h4>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{incident.description}</p>
            
            <div className="mt-6">
              <h4 className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 flex items-center`}>
                <AlertTriangle size={16} className="mr-2 text-indigo-600" />
                Recommended Actions
              </h4>
              <ul className="space-y-2">
                {getRecommendations(incident.severity).map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 size={16} className="mr-2 mt-1 text-green-500" />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;