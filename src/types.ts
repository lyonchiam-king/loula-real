export interface Treatment {
  id: string;
  name: string;
  tags: [string, string];
  price: number;
  duration: string;
  downtime: string;
  downtimeCategory: 'none' | 'minimal' | 'mild';
  budgetCategory: 'low' | 'mid' | 'high';
  budgetSymbol: '£' | '££' | '£££';
  resultTag: string;
  description: string;
  bestFor: string;
  prepInstructions: string;
  goalCategory: 'hydration' | 'texture' | 'lashes_brows';
  image: string;
}

export interface TreatmentFinderState {
  goal: string | null;
  downtime: string | null;
  budget: string | null;
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  notes: string;
  goal?: string;
  budget?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  tag: string;
  url: string;
}
