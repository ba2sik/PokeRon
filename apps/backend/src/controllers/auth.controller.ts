import { Request, Response } from 'express';
import { supabase } from '../supabase/supabseClient';
import { isNullOrUndefined } from '../utils/types';
import AuthService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ message: 'Invalid credentials', error: error.message });
  }

  const { access_token } = data.session;

  res.cookie('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res.status(200).json({ message: 'Signed in successfully' });
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(409).json({ message: 'Invalid credentials', error: error.message });
  }

  if (isNullOrUndefined(data.session)) {
    return res.status(500).json({ message: 'Session not retrieved' });
  }

  const { access_token } = data.session;

  res.cookie('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res.status(201).json({ message: 'User created successfully' });
};

export const logout = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(400).json({ message: 'No user logged in' });
  }

  const { error } = await supabase.auth.signOut(accessToken);

  if (error) {
    return res.status(500).json({ message: 'Failed to log out', error: error.message });
  }

  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};

export const verifyToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(200).json({ loggedIn: false, email: null });
  }

  const user = await AuthService.getUserByToken(accessToken);

  if (isNullOrUndefined(user)) {
    return res.status(200).json({ loggedIn: false, email: null });
  }

  return res.status(200).json({ loggedIn: true, email: user.email });
};
