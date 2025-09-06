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

// Enhanced rate limiting utility with session tracking
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    
    // Clean up old entries periodically
    setInterval(() => {
      const now = Date.now();
      for (const [key, record] of this.attempts.entries()) {
        if (now - record.lastAttempt > this.windowMs * 2) {
          this.attempts.delete(key);
        }
      }
    }, this.windowMs);
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
    
    // Log suspicious activity
    if (record.count > this.maxAttempts) {
      console.warn('Rate limit exceeded:', { 
        key, 
        attempts: record.count, 
        timestamp: new Date().toISOString() 
      });
    }
    
    return record.count <= this.maxAttempts;
  }

  getRemainingAttempts(key: string): number {
    const record = this.attempts.get(key);
    if (!record) return this.maxAttempts;
    
    const now = Date.now();
    if (now - record.lastAttempt > this.windowMs) {
      return this.maxAttempts;
    }
    
    return Math.max(0, this.maxAttempts - record.count);
  }
}

export const formRateLimiter = new RateLimiter(3, 30000);

// Security logging utility
export const logSecurityEvent = (event: string, details: Record<string, any>) => {
  const logEntry = {
    event,
    timestamp: new Date().toISOString(),
    ...details
  };
  
  console.info('Security Event:', logEntry);
  
  // In production, this could be sent to a logging service
  // Example: analytics.track('security_event', logEntry);
};
