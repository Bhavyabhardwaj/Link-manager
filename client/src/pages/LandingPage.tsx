import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Link as LinkIcon, Users, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">LinkManager</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Links,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
            Simplified
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create a beautiful bio page with all your links, track clicks with detailed analytics,
          and shorten URLs with custom slugs. Like Linktree, but better.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg">
              Start Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg">View Demo</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to manage your links
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features to help you organize, track, and optimize your links
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bio Pages</h3>
            <p className="text-gray-600">
              Create beautiful profile pages with all your important links in one place
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">URL Shortener</h3>
            <p className="text-gray-600">
              Shorten long URLs with custom slugs, password protection, and expiration dates
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track clicks, view geographic data, and analyze your link performance
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">QR Codes</h3>
            <p className="text-gray-600">
              Generate QR codes for any link to make sharing easier
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Link Management</h3>
            <p className="text-gray-600">
              Organize, edit, and manage all your links from a single dashboard
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Features</h3>
            <p className="text-gray-600">
              Password protection, click limits, custom expiration, and bulk operations
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to simplify your links?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of creators, businesses, and individuals who trust LinkManager
          </p>
          <Link to="/register">
            <Button size="lg">
              Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 LinkManager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
