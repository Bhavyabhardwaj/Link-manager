import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { linksService } from '../services';
import type {
  CreateBioLinkRequest,
  CreateShortLinkRequest,
  UpdateLinkRequest,
} from '../types';

// Bio Links
export const useBioLinks = () => {
  return useQuery({
    queryKey: ['bioLinks'],
    queryFn: () => linksService.getBioLinks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateBioLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkData: CreateBioLinkRequest) => linksService.createBioLink(linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      toast.success('Bio link created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create bio link');
    },
  });
};

// Short Links
export const useShortLinks = () => {
  return useQuery({
    queryKey: ['shortLinks'],
    queryFn: () => linksService.getShortLinks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateShortLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkData: CreateShortLinkRequest) => linksService.createShortLink(linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      toast.success('Short link created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create short link');
    },
  });
};

// Universal Link Operations
export const useUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ linkId, updateData }: { linkId: string; updateData: UpdateLinkRequest }) =>
      linksService.updateLink(linkId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      toast.success('Link updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update link');
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId: string) => linksService.deleteLink(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      toast.success('Link deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete link');
    },
  });
};

export const useReorderLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkIds: string[]) => linksService.reorderLinks(linkIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      toast.success('Links reordered successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reorder links');
    },
  });
};

// Advanced Features
export const useGenerateQRCode = (linkId: string | null) => {
  return useQuery({
    queryKey: ['qrCode', linkId],
    queryFn: () => linksService.generateQRCode(linkId!),
    enabled: !!linkId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLinkStatus = (linkId: string | null) => {
  return useQuery({
    queryKey: ['linkStatus', linkId],
    queryFn: () => linksService.getLinkStatus(linkId!),
    enabled: !!linkId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useExpiredLinks = () => {
  return useQuery({
    queryKey: ['expiredLinks'],
    queryFn: () => linksService.getExpiredLinks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCleanupExpiredLinks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => linksService.cleanupExpiredLinks(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      queryClient.invalidateQueries({ queryKey: ['expiredLinks'] });
      toast.success('Expired links cleaned up successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cleanup expired links');
    },
  });
};

export const useExtendLinkExpiration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ linkId, expiresAt }: { linkId: string; expiresAt: string }) =>
      linksService.extendLinkExpiration(linkId, expiresAt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      queryClient.invalidateQueries({ queryKey: ['expiredLinks'] });
      toast.success('Link expiration extended!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to extend expiration');
    },
  });
};

export const useRemoveLinkExpiration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkId: string) => linksService.removeLinkExpiration(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bioLinks'] });
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] });
      queryClient.invalidateQueries({ queryKey: ['expiredLinks'] });
      toast.success('Link expiration removed!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove expiration');
    },
  });
};

// Analytics
export const useLinkAnalytics = (linkId: string | null) => {
  return useQuery({
    queryKey: ['linkAnalytics', linkId],
    queryFn: () => linksService.getLinkAnalytics(linkId!),
    enabled: !!linkId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
