export interface Room {
  _id: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  maxOccupancy?: number;
  amenities?: string[];
  isAvailable?: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}