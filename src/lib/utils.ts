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

// Enhanced security logging utility with database integration
export const logSecurityEvent = async (event: string, details: Record<string, any>) => {
  const logEntry = {
    event,
    timestamp: new Date().toISOString(),
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    ...details
  };
  
  console.info('Security Event:', logEntry);
  
  // Send to centralized security logging system
  try {
    // Only import supabase client when needed to avoid circular dependencies
    const { supabase } = await import('@/integrations/supabase/client');
    
    await supabase.from('security_logs').insert({
      event_type: event,
      user_id: details.userId || null,
      user_agent: logEntry.user_agent,
      details: details
    });
  } catch (error) {
    // Fail silently to prevent security logging from breaking the app
    console.warn('Failed to log security event to database:', error);
  }
};

// Session management utility
export const validateSession = () => {
  const sessionTimeout = 8 * 60 * 60 * 1000; // 8 hours
  const lastActivity = localStorage.getItem('lastActivity');
  
  if (lastActivity) {
    const timeSinceActivity = Date.now() - parseInt(lastActivity);
    if (timeSinceActivity > sessionTimeout) {
      localStorage.removeItem('lastActivity');
      return false;
    }
  }
  
  localStorage.setItem('lastActivity', Date.now().toString());
  return true;
};

// Password strength validator
export const validatePasswordStrength = (password: string): { 
  isValid: boolean; 
  score: number; 
  feedback: string[] 
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else feedback.push('Password should be at least 8 characters long');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');

  if (/\d/.test(password)) score += 1;
  else feedback.push('Include numbers');

  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  else feedback.push('Include special characters');

  return {
    isValid: score >= 4,
    score,
    feedback
  };
};
