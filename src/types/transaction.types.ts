export type TabType = 'overview' | 'financial' | 'gae' | 'payment' | 'documents' | 'termination';

export interface PreviewModalState {
  isOpen: boolean;
  url: string;
  type: 'image' | 'pdf' | 'document';
  title: string;
}

export interface TabConfig {
  key: TabType;
  label: string;
  icon: React.ReactNode;
}
