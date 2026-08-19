export interface RomanticMessage {
  id: number;
  title: string;
  subtitle?: string;
  text: string;
  quote?: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: string;
}

export interface CustomConfig {
  recipientName: string;
  senderName: string;
  relationshipDate: string; // YYYY-MM-DD
  mainQuestion: string;
  messages: RomanticMessage[];
}
