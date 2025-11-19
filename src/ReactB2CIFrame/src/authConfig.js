// Azure AD B2C Configuration
// Update these values with your Azure B2C tenant information

export const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Application (client) ID from Azure Portal
    authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_SignUpSignIn', // Your B2C authority
    knownAuthorities: ['YOUR_TENANT_NAME.b2clogin.com'], // Your B2C domain
    redirectUri: window.location.origin, // Redirect URI (e.g., http://localhost:3000)
    postLogoutRedirectUri: window.location.origin, // Post logout redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['openid', 'profile', 'offline_access'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

// Policy names
export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_SignUpSignIn',
    forgotPassword: 'B2C_1_PasswordReset',
    editProfile: 'B2C_1_ProfileEdit',
  },
  authorities: {
    signUpSignIn: {
      authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_SignUpSignIn',
    },
    forgotPassword: {
      authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_PasswordReset',
    },
    editProfile: {
      authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_ProfileEdit',
    },
  },
  authorityDomain: 'YOUR_TENANT_NAME.b2clogin.com',
};
