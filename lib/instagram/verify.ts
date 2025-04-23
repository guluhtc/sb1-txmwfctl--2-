import { verifyToken as checkTokenValidity } from './token'
import { createClient } from "@/lib/supabase"
import { getToken } from "./token"

import { supabase } from '@/lib/supabase'

export interface VerificationResult {
  isValid: boolean;
  token?: string;
  error?: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode: number;
    fbtrace_id: string;
  };
}

export async function validateInstagramToken(userId: string, token: string): Promise<VerificationResult> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('instagram_auth_sessions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (sessionError) throw sessionError

    if (!session) {
      return {
        isValid: false,
        error: 'No active Instagram session found'
      }
    }

    if (session.access_token !== token) {
      return {
        isValid: false,
        error: 'Invalid token'
      }
    }

    const tokenInfo = await checkTokenValidity(userId)
    return {
      isValid: tokenInfo.isValid,
      token: tokenInfo.isValid ? token : undefined,
      error: tokenInfo.error
    }
  } catch (error: any) {
    console.error('Error verifying token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}

export async function createToken(userId: string, token: string): Promise<VerificationResult> {
  try {
    const { error } = await supabase
      .from('instagram_auth_sessions')
      .upsert({
        user_id: userId,
        access_token: token,
        expires_at: new Date(Date.now() + (60 * 60 * 24 * 60 * 1000)).toISOString(), // 60 days
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) throw error

    return {
      isValid: true,
      token
    }
  } catch (error: any) {
    console.error('Error creating token:', error)
    return {
      isValid: false,
      error: error.message
    }
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${token}`
    );
    const data: TokenResponse | ErrorResponse = await response.json();
    
    if ('error' in data) {
      console.error('Token verification failed:', data.error);
      return false;
    }
    
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error verifying token:', error.message);
    }
    return false;
  }
}