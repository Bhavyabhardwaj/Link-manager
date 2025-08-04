import React from 'react';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track your link performance and understand your audience.
          </p>
        </div>

        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analytics Dashboard Coming Soon!
          </h2>
          <p className="text-gray-600">
            We're building comprehensive analytics with charts, geographic data, and insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
