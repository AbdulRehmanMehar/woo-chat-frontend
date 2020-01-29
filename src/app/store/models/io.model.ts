export interface Message {
  sender_id: string;
  receiver_id: string;
  message: string;
}

export interface ConversationData {
  conversation: Message[];
}

export interface ConversationResponse {
  success: boolean;
  message: string;
  data: ConversationData;
}
