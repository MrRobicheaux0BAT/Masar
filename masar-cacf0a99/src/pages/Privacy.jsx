import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
           <Link to={createPageUrl('Home')}>
              <Button variant="outline" className="neo-brutal-border neo-brutal-shadow-small neo-brutal-text">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
        </div>
        <div className="bg-white p-8 neo-brutal-border neo-brutal-shadow">
            <h1 className="neo-brutal-text text-4xl mb-6">Privacy Policy</h1>
            <div className="prose lg:prose-xl max-w-none space-y-4 font-medium text-gray-700">
              <p>Last updated: August 03, 2024</p>
              <p>Your privacy is important to us. It is Masar's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
              <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
              <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
              <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
              <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
            </div>
        </div>
      </div>
    </div>
  );
}