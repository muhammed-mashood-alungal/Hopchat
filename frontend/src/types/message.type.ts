export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
}
