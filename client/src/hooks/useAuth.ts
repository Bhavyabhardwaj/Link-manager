import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authService } from '../services';
import type { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Welcome back!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Account created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: ForgotPasswordRequest) => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success('Password reset email sent!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset email');
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (resetData: ResetPasswordRequest) => authService.resetPassword(resetData),
    onSuccess: () => {
      toast.success('Password reset successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reset password');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(authService.logout()),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully');
    },
  });
};
