export type Severity = 'Low' | 'Medium' | 'High';

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reported_at: string;
}

export interface IncidentFilters {
  severity: Severity | 'All';
  searchQuery: string;
}

export interface IncidentSort {
  dateOrder: 'newest' | 'oldest';
}

export interface NewIncident {
  title: string;
  description: string;
  severity: Severity;
}