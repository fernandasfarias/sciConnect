export interface Paper {
  id: string;
  title: string;
  author: string;
  advisor: string;
  publishedDate: string;
  department: string;
  academicCenter: "CCET" | "CCBS" | "CCSA" | "CECH";
  citations: number;
  pdfUrl: string;
  traditionalSummary: string;
  aiSummary: string;
  keyConcepts: {
    id: string;
    concept: string;
    description: string;
  }[];
  tags: string[];
}

export interface AcademicEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  timeSlot: string;
  type: "Workshop" | "Lecture" | "Conference";
  tags: string[];
  location: string;
  isEnrolled: boolean;
  matchScore: number; // e.g. 98 -> "98% Match"
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: "article" | "code";
  subTitle: string;
  tags?: string[];
  stars?: number;
}

export interface MatchOffer {
  id: string;
  type: "lab" | "mentoring";
  title: string;
  description: string;
  matchType: "98% Match" | "Suggested";
  tags: string[];
  deadlineOrRoom: string;
}

export interface AnalyticsData {
  metaPdiPercentage: number;
  actionsRegistered: number;
  externalAccesses: string; // e.g. "842.5k"
  hIndex: number;
  activeIntellectualProperty: number;
  pendingApproval: number;
  monthlyTrend: {
    month: string;
    value2024: number;
    value2023: number;
  }[];
  risingTrends: {
    tag: string;
    size: "sm" | "md" | "lg" | "xl";
    growthRate?: string;
  }[];
  publicationsByCenter: {
    center: string;
    label: string;
    count: number;
    percentage: number;
  }[];
  topResearchers: {
    name: string;
    avatar: string;
    achievement: string;
    type: "patented" | "journal";
    metricLabel: string;
    metricValue: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
