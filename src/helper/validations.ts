// Validate email format using regex
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password requirements (minimum 8 characters)
export const isPasswordValid = (password: string): boolean => {
  return password.length >= 8;
};

// Validate password match
export const isPasswordMatch = (password: string, confirm: string): boolean => {
  return password === confirm && password.length > 0;
};

// Phone number validation
export const isPhoneNumberValid = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+?[0-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
};
