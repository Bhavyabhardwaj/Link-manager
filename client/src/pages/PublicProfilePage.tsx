import React from 'react';
import { useParams } from 'react-router-dom';
import { usePublicProfile } from '../hooks/usePublic';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading, error } = usePublicProfile(username || null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600">
            The profile you're looking for doesn't exist or has been made private.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Profile Header */}
          <div className="text-center mb-6">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name || profile.username}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">
                  {(profile.name || profile.username).charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <h1 className="text-xl font-bold text-gray-900">
              {profile.name || profile.username}
            </h1>
            
            {profile.bio && (
              <p className="text-gray-600 mt-2">{profile.bio}</p>
            )}
          </div>

          {/* Links */}
          <div className="space-y-3">
            {profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  {link.icon && (
                    <span className="text-lg mr-3">{link.icon}</span>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{link.title}</h3>
                    {link.description && (
                      <p className="text-sm text-gray-600">{link.description}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {profile.links.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No links available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
