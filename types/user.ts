export interface User {
  id: string;
  name: string;
  phone: string;

  totalSaved: number;
  goldEquivalent: number;

  goalGrams: number;

  createdAt: string;
}