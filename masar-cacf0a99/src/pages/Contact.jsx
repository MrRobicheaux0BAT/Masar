import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
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
            <h1 className="neo-brutal-text text-4xl mb-6">Contact Us</h1>
            <div className="prose lg:prose-xl max-w-none space-y-4 font-medium text-gray-700">
              <p>If you have any questions, feedback, or need support, please feel free to reach out to us.</p>
              <p className="flex items-center gap-3">
                <Mail className="w-6 h-6" />
                <strong>Email:</strong> <a href="mailto:support@masar.app" className="text-blue-600 hover:underline">support@masar.app</a>
              </p>
              <p>We aim to respond to all inquiries within 24-48 hours on business days.</p>
            </div>
        </div>
      </div>
    </div>
  );
}