import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Input sanitization to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
  if (!input) return input;
  
  // Remove potentially dangerous patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Rate limiting utility
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now - record.lastAttempt > this.windowMs) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    record.count++;
    record.lastAttempt = now;
    return record.count <= this.maxAttempts;
  }
}

export const formRateLimiter = new RateLimiter(3, 30000);
