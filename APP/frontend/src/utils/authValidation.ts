export function isValidEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}

export function isValidPhone(value: string) {
  return /^\+?\d{10,15}$/.test(value.replace(/\s+/g, ''));
}

export function isStrongPassword(value: string) {
  return value.length >= 6;
}

export function isValidUsername(value: string) {
  return /^[a-z0-9_]{3,20}$/i.test(value.trim());
}
