import { IsNotEmpty } from 'class-validator';

export interface InventoryDto {
    id: string;

    name: string;

    description?: string;
  
    category: string;
  
    unit_price: number;
  
    quantity: number;
  
    created_at: Date;
  
    updated_at: Date;
}