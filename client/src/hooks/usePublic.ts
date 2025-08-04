import { useQuery } from '@tanstack/react-query';
import { publicService } from '../services';

export const usePublicProfile = (username: string | null) => {
  return useQuery({
    queryKey: ['publicProfile', username],
    queryFn: () => publicService.getPublicProfile(username!),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLinkInfo = (slug: string | null) => {
  return useQuery({
    queryKey: ['linkInfo', slug],
    queryFn: () => publicService.getLinkInfo(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePublicLinkAnalytics = (
  slug: string | null,
  timeframe: '1h' | '24h' | '7d' | '30d' = '24h',
  limit: number = 10,
  offset: number = 0
) => {
  return useQuery({
    queryKey: ['publicLinkAnalytics', slug, timeframe, limit, offset],
    queryFn: () => publicService.getLinkAnalytics(slug!, timeframe, limit, offset),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
