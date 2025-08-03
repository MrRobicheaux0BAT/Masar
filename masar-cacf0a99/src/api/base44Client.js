import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "688e8e2db47b9018cacf0a99", 
  requiresAuth: true // Ensure authentication is required for all operations
});
