// Azure AD B2C Configuration
// Update these values with your Azure B2C tenant information

export const msalConfig = {
  auth: {
    clientId: 'ffdbf82f-41ce-4507-8ed4-35ce61680f86', // Application (client) ID from Azure Portal
    authority: 'https://login.emptywolf.com/mtwb2c.onmicrosoft.com/B2C_1A_SignUp_SignIn', // Your B2C authority
    knownAuthorities: ['login.emptywolf.com'], // Your B2C domain
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
      authority: 'https://login.emptywolf.com/mtwb2c.onmicrosoft.com/B2C_1A_SignUp_SignIn',
    },
    forgotPassword: {
      authority: 'https://login.emptywolf.com/mtwb2c.onmicrosoft.com/B2C_1A_PasswordReset',
    },
    editProfile: {
      authority: 'https://login.emptywolf.com/mtwb2c.onmicrosoft.com/B2C_1A_ProfileEdit',
    },
  },
  authorityDomain: 'login.emptywolf.com',
};
