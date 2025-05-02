import React from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  Lightbulb, 
  Pin, 
  Download, 
  RefreshCw,
  Printer,
  ExternalLink,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Incident } from '../types/incident';

interface SidebarProps {
  incidents: {
    high: number;
    medium: number;
    low: number;
    total: number;
    latest: string;
  };
  onResetFilters: () => void;
  onExportCSV: () => void;
  onPrintSummary: () => void;
  isDarkMode: boolean;
  pinnedIncidents: Incident[];
  onPinnedIncidentClick: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  incidents, 
  onResetFilters,
  onExportCSV,
  onPrintSummary,
  isDarkMode,
  pinnedIncidents,
  onPinnedIncidentClick
}) => {
  const [currentTip, setCurrentTip] = React.useState(0);

  const aiSafetyTips = [
    {
      text: "Always verify AI outputs in critical systems",
      icon: "🔍"
    },
    {
      text: "Maintain human oversight in decision-making processes",
      icon: "👥"
    },
    {
      text: "Regular testing and validation is crucial",
      icon: "✅"
    },
    {
      text: "Document all AI-related incidents promptly",
      icon: "📝"
    },
    {
      text: "Keep the human in the loop for important decisions",
      icon: "🤝"
    }
  ];

  const showNextTip = () => {
    setCurrentTip((prev) => (prev + 1) % aiSafetyTips.length);
  };

  return (
    <div className={`w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50'} shadow-lg rounded-lg p-6 space-y-8`}>
      {/* Dashboard Link */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
        <Link to="/" className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-indigo-600`}>
          <Home size={20} className="mr-2" />
          <span className="font-semibold">Dashboard</span>
        </Link>
      </div>

      {/* Dashboard Overview */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
          <AlertTriangle size={20} className="mr-2 text-indigo-600" />
          Overview
        </h2>
        <div className="space-y-3">
          <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'bg-red-900' : 'bg-red-50'} p-2 rounded`}>
            <span className={isDarkMode ? 'text-red-200' : 'text-red-700'}>High Incidents</span>
            <span className={`font-medium ${isDarkMode ? 'bg-red-800' : 'bg-red-100'} px-2 py-1 rounded`}>{incidents.high}</span>
          </div>
          <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50'} p-2 rounded`}>
            <span className={isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}>Medium Incidents</span>
            <span className={`font-medium ${isDarkMode ? 'bg-yellow-800' : 'bg-yellow-100'} px-2 py-1 rounded`}>{incidents.medium}</span>
          </div>
          <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'bg-green-900' : 'bg-green-50'} p-2 rounded`}>
            <span className={isDarkMode ? 'text-green-200' : 'text-green-700'}>Low Incidents</span>
            <span className={`font-medium ${isDarkMode ? 'bg-green-800' : 'bg-green-100'} px-2 py-1 rounded`}>{incidents.low}</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-50'} p-2 rounded`}>
              <span className={isDarkMode ? 'text-indigo-200' : 'text-indigo-700'}>Total Incidents</span>
              <span className={`font-medium ${isDarkMode ? 'bg-indigo-800' : 'bg-indigo-100'} px-2 py-1 rounded`}>{incidents.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Safety Tip */}
      <div className={`${isDarkMode ? 'from-indigo-900 to-purple-900' : 'from-indigo-500 to-purple-500'} bg-gradient-to-r rounded-lg p-4 text-white`}>
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Lightbulb size={20} className="mr-2" />
          AI Safety Tip
        </h2>
        <div className="bg-white/10 rounded p-3 backdrop-blur-sm">
          <p className="text-2xl mb-2">{aiSafetyTips[currentTip].icon}</p>
          <p className="text-sm mb-2">{aiSafetyTips[currentTip].text}</p>
        </div>
        <button
          onClick={showNextTip}
          className="mt-2 text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full flex items-center transition-colors"
        >
          <RefreshCw size={14} className="mr-1" />
          Show Another
        </button>
      </div>

      {/* Pinned Incidents */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 flex items-center`}>
          <Pin size={20} className="mr-2 text-indigo-600" />
          Pinned Incidents
        </h2>
        <ul className="space-y-2">
          {pinnedIncidents.map((incident) => (
            <li 
              key={incident.id}
              onClick={() => onPinnedIncidentClick(incident.id)}
              className={`p-2 ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-50 hover:bg-gray-100'
              } rounded cursor-pointer transition-colors`}
            >
              <span className={`mr-2 ${
                incident.severity === 'High' ? 'text-red-500' :
                incident.severity === 'Medium' ? 'text-yellow-500' :
                'text-green-500'
              }`}>●</span>
              <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{incident.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tools */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>🧰 Tools</h2>
        <div className="space-y-2">
          <button 
            onClick={onExportCSV}
            className={`w-full text-left text-sm ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            } p-2 rounded flex items-center transition-colors`}
          >
            <Download size={16} className="mr-2 text-indigo-600" />
            Export CSV
          </button>
          <button 
            onClick={onResetFilters}
            className={`w-full text-left text-sm ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            } p-2 rounded flex items-center transition-colors`}
          >
            <RefreshCw size={16} className="mr-2 text-indigo-600" />
            Reset Filters
          </button>
          <button 
            onClick={onPrintSummary}
            className={`w-full text-left text-sm ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            } p-2 rounded flex items-center transition-colors`}
          >
            <Printer size={16} className="mr-2 text-indigo-600" />
            Print Summary
          </button>
        </div>
      </div>

      {/* Need Help Section */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 flex items-center`}>
          <HelpCircle size={20} className="mr-2 text-indigo-600" />
          Need Help?
        </h2>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/help/report-incident"
              className={`w-full text-left text-sm ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              } p-2 rounded flex items-center transition-colors block`}
            >
              <ExternalLink size={14} className="mr-2 text-indigo-600" />
              How to report an incident?
            </Link>
          </li>
          <li>
            <Link 
              to="/help/glossary"
              className={`w-full text-left text-sm ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              } p-2 rounded flex items-center transition-colors block`}
            >
              <ExternalLink size={14} className="mr-2 text-indigo-600" />
              AI Safety Glossary
            </Link>
          </li>
          <li>
            <Link 
              to="/help/export"
              className={`w-full text-left text-sm ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              } p-2 rounded flex items-center transition-colors block`}
            >
              <ExternalLink size={14} className="mr-2 text-indigo-600" />
              Export your report
            </Link>
          </li>
          <li>
            <Link 
              to="/help/learn-more"
              className={`w-full text-left text-sm ${
                isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              } p-2 rounded flex items-center transition-colors block`}
            >
              <ExternalLink size={14} className="mr-2 text-indigo-600" />
              Learn more at HumanChain
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;