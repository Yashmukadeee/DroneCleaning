export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatAction {
  label: string;
  type: 'link' | 'scroll' | 'prompt';
  target: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestedQuestions?: string[];
  isError?: boolean;
}

export interface QuickPrompt {
  id: string;
  icon: string;
  label: string;
  query: string;
  category: 'Tech' | 'Chemistry' | 'Business' | 'Safety' | 'Author';
}

export interface KnowledgeItem {
  id: string;
  keywords: string[];
  topics: string[];
  title: string;
  summary: string;
  detailedAnswer: string;
  relatedArticleId?: string;
  suggestedNextQuestions?: string[];
  actions?: ChatAction[];
}
