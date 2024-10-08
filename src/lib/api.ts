import { RestaurantInfo, MenuItem } from '@/types';

// Mock API functions

export const mockFetchRestaurantInfo = async (restaurantId?: string): Promise<RestaurantInfo> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: restaurantId || '1',
    name: 'Sample Restaurant',
    address: '123 Main St, City, Country',
    description: 'A cozy restaurant serving delicious meals.',
  };
};

export const mockFetchMenuItems = async (restaurantId?: string): Promise<MenuItem[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: '1', name: 'Burger', description: 'Juicy beef patty with fresh vegetables', price: 10.99 },
    { id: '2', name: 'Pizza', description: 'Classic Margherita with tomato and mozzarella', price: 12.99 },
    { id: '3', name: 'Salad', description: 'Fresh garden salad with vinaigrette dressing', price: 8.99 },
  ];
};

export const mockAddMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { ...item, id: Date.now().toString() };
};

export const mockUpdateMenuItem = async (item: MenuItem): Promise<MenuItem> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return item;
};

export const mockDeleteMenuItem = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};