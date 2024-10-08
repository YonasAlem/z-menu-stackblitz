// Mock authentication functions

export const mockLogin = async (email: string, password: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, always return true
  return true;
};

export const mockSignup = async (email: string, password: string, restaurantName: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, always return true
  return true;
};

export const mockLogout = async (): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
};