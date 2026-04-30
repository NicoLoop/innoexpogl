export type Category = 'AI' | 'ML' | 'CV' | 'NLP' | 'RL' | 'Robotics';

export interface Project {
  id: string;
  name: string;
  author: string;
  category: Category;
  description: string;
  stars: string;
  forks: string;
  date: string;
  status: 'Active' | 'Under Review' | 'Completed';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
