import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import IncidentList from './IncidentList';
import IncidentForm from './IncidentForm';
import Footer from './Footer'; // ✅ Added Footer import
import { mockIncidents } from '../data/mockIncidents';
import { Incident, IncidentFilters, IncidentSort, NewIncident } from '../types/incident';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filters, setFilters] = useState<IncidentFilters>({
    severity: 'All',
    searchQuery: '',
  });
  const [sort, setSort] = useState<IncidentSort>({
    dateOrder: 'newest',
  });
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(null);

  const handleFilterChange = (newFilters: IncidentFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: IncidentSort) => {
    setSort(newSort);
  };

  const handleSubmitIncident = (newIncident: NewIncident) => {
    const incident: Incident = {
      ...newIncident,
      id: Date.now(),
      reported_at: new Date().toISOString(),
    };
    
    setIncidents([incident, ...incidents]);
    setShowForm(false);
    setFormSuccess(true);
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 3000);
  };

  const handlePinnedIncidentClick = (id: number) => {
    setSelectedIncidentId(id);
    const element = document.getElementById(`incident-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('highlight-incident');
      setTimeout(() => {
        element.classList.remove('highlight-incident');
      }, 2000);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Description', 'Severity', 'Reported At'];
    const csvContent = [
      headers.join(','),
      ...incidents.map(incident => 
        [
          incident.id,
          `"${incident.title}"`,
          `"${incident.description}"`,
          incident.severity,
          incident.reported_at
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'incidents.csv';
    link.click();
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const handleResetFilters = () => {
    setFilters({
      severity: 'All',
      searchQuery: '',
    });
    setSort({
      dateOrder: 'newest',
    });
  };

  const incidentStats = {
    high: incidents.filter(i => i.severity === 'High').length,
    medium: incidents.filter(i => i.severity === 'Medium').length,
    low: incidents.filter(i => i.severity === 'Low').length,
    total: incidents.length,
    latest: incidents.length > 0 ? 
      new Date(Math.max(...incidents.map(i => new Date(i.reported_at).getTime()))).toLocaleDateString() : 
      'No incidents'
  };

  const pinnedIncidents = incidents
    .filter(i => i.severity === 'High')
    .slice(0, 2);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar 
        filters={filters}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onNewIncident={() => setShowForm(true)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <Sidebar 
            incidents={incidentStats}
            onResetFilters={handleResetFilters}
            onExportCSV={handleExportCSV}
            onPrintSummary={handlePrintSummary}
            isDarkMode={isDarkMode}
            pinnedIncidents={pinnedIncidents}
            onPinnedIncidentClick={handlePinnedIncidentClick}
          />
          
          <main className="flex-1">
            {formSuccess && (
              <div className={`mb-6 p-4 ${
                isDarkMode ? 'bg-green-900 border-green-700 text-green-200' : 'bg-green-100 border-green-500 text-green-700'
              } border-l-4 rounded animate-fadeIn`}>
                <p className="font-medium">Incident successfully reported!</p>
                <p className="text-sm">The new incident has been added to the dashboard.</p>
              </div>
            )}
            
            {showForm && (
              <IncidentForm 
                onSubmit={handleSubmitIncident} 
                onCancel={() => setShowForm(false)}
                isDarkMode={isDarkMode}
              />
            )}
            
            <IncidentList 
              incidents={incidents} 
              filters={filters} 
              sort={sort}
              isDarkMode={isDarkMode}
              selectedIncidentId={selectedIncidentId}
            />
          </main>
        </div>
      </div>

      <Footer /> {/* ✅ Added Footer at the bottom */}
    </div>
  );
};

export default Dashboard;
