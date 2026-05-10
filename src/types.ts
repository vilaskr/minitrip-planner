export interface Trip {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'OWNER' | 'MANAGER' | 'AGENT' | 'MEMBER';
  badge: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // member id
  splitWith: string[]; // member ids
  date: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  notes: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export interface Note {
  id: string;
  content: string;
  color: string;
  createdAt: string;
}

export interface MapLink {
  id: string;
  name: string;
  url: string;
}
