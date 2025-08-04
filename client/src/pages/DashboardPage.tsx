import React from 'react';
import { useAuth } from '../hooks/useAuthContext';
import { useBioLinks, useShortLinks } from '../hooks/useLinks';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: bioLinks, isLoading: bioLinksLoading } = useBioLinks();
  const { data: shortLinks, isLoading: shortLinksLoading } = useShortLinks();

  if (bioLinksLoading || shortLinksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your links and track your analytics from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Bio Links</h3>
            <p className="text-2xl font-bold text-gray-900">{bioLinks?.length || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Short Links</h3>
            <p className="text-2xl font-bold text-gray-900">{shortLinks?.length || 0}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
            <p className="text-2xl font-bold text-gray-900">
              {(bioLinks?.reduce((sum, link) => sum + link.clickCount, 0) || 0) +
               (shortLinks?.reduce((sum, link) => sum + link.clickCount, 0) || 0)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Active Links</h3>
            <p className="text-2xl font-bold text-gray-900">
              {(bioLinks?.filter(link => link.active).length || 0) +
               (shortLinks?.filter(link => link.active).length || 0)}
            </p>
          </div>
        </div>

        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard Coming Soon!
          </h2>
          <p className="text-gray-600">
            We're building an amazing dashboard experience for you. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
