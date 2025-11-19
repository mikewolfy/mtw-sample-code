# React Azure B2C Authentication App

A React.js application demonstrating authentication with Azure Active Directory B2C (Azure AD B2C). This application showcases how to integrate Azure B2C identity provider for secure user authentication in a React single-page application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Azure B2C Setup](#azure-b2c-setup)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Running Locally](#running-locally)
- [Deploying to Azure Static Web Apps](#deploying-to-azure-static-web-apps)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Overview

This application demonstrates the implementation of Azure AD B2C authentication in a React application using the Microsoft Authentication Library (MSAL) for JavaScript. Users can sign in, view their profile information, and sign out securely.

## Features

- ✅ Sign in with Azure AD B2C
- ✅ Sign out functionality
- ✅ Display user profile information
- ✅ View ID token claims
- ✅ Popup authentication flow
- ✅ Session storage for tokens
- ✅ Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Azure Subscription** - [Create a free account](https://azure.microsoft.com/free/)
- **Git** (optional, for cloning)

## Azure B2C Setup

### Step 1: Create an Azure AD B2C Tenant

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Search for "Azure AD B2C" and create a new tenant
3. Follow the prompts to create your B2C tenant
4. Note your **Tenant Name** (e.g., `contoso.onmicrosoft.com`)

### Step 2: Register Your Application

1. In the Azure AD B2C portal, go to **App registrations**
2. Click **New registration**
3. Enter application details:
   - **Name**: `React B2C App` (or your preferred name)
   - **Supported account types**: Accounts in any identity provider or organizational directory
   - **Redirect URI**: 
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:3000` (for local development)
4. Click **Register**
5. Note the **Application (client) ID** - you'll need this

### Step 3: Configure Redirect URIs

1. In your app registration, go to **Authentication**
2. Under **Single-page application**, add redirect URIs:
   - `http://localhost:3000` (for local development)
   - Your production URL (for Azure Static Web Apps deployment)
3. Under **Implicit grant and hybrid flows**, ensure:
   - ✅ **Access tokens** (not required for SPA)
   - ✅ **ID tokens** (check this)
4. Click **Save**

### Step 4: Create User Flows

1. In Azure AD B2C, go to **User flows**
2. Click **New user flow**
3. Create the following user flows:
   - **Sign up and sign in** - Name it `B2C_1_SignUpSignIn`
   - **Password reset** - Name it `B2C_1_PasswordReset`
   - **Profile editing** - Name it `B2C_1_ProfileEdit`

### Step 5: Note Your Configuration Values

You'll need the following values:
- **Client ID**: From your app registration
- **Tenant Name**: Your B2C tenant name (e.g., `contoso`)
- **Policy Names**: The user flow names you created

## Configuration

### Update authConfig.js

1. Open `src/authConfig.js`
2. Replace the placeholder values:

```javascript
export const msalConfig = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Replace with your Application (client) ID
    authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/B2C_1_SignUpSignIn',
    knownAuthorities: ['YOUR_TENANT_NAME.b2clogin.com'],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  // ... rest of config
};
```

3. Update the `b2cPolicies` section with your tenant name:

```javascript
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
    // ... update other authorities
  },
  authorityDomain: 'YOUR_TENANT_NAME.b2clogin.com',
};
```

### Using Environment Variables (Optional)

Alternatively, you can use environment variables:

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```

2. Update the values in `.env.local`

3. Modify `authConfig.js` to use environment variables:
   ```javascript
   clientId: process.env.REACT_APP_B2C_CLIENT_ID,
   ```

## How It Works

### Authentication Flow

1. **Initialization**: The app initializes the MSAL PublicClientApplication with your Azure B2C configuration
2. **Unauthenticated State**: Users see a login page with a "Sign In with Azure B2C" button
3. **Sign In**: When clicked, a popup window opens with the Azure B2C sign-in page
4. **Authentication**: User enters credentials and authenticates with Azure B2C
5. **Token Acquisition**: MSAL acquires ID tokens and stores them in session storage
6. **Authenticated State**: The app displays user profile information and claims
7. **Sign Out**: Users can sign out, which clears the session

### Key Components

- **MsalProvider**: Wraps the app and provides MSAL context
- **AuthenticatedTemplate**: Renders content only when user is authenticated
- **UnauthenticatedTemplate**: Renders content only when user is not authenticated
- **useMsal Hook**: Provides access to MSAL instance and authentication state

### MSAL Configuration

The app uses the following MSAL settings:

- **Cache Location**: `sessionStorage` (more secure, no SSO across tabs)
- **Authentication Method**: Popup (can be changed to redirect)
- **Scopes**: `openid`, `profile`, `offline_access`

## Running Locally

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Azure B2C Settings

Update `src/authConfig.js` with your Azure B2C configuration (see [Configuration](#configuration))

### Step 3: Start the Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Step 4: Test Authentication

1. Click "Sign In with Azure B2C"
2. A popup window will appear with the Azure B2C sign-in page
3. Create a new account or sign in with existing credentials
4. After successful authentication, you'll see your profile information

## Deploying to Azure Static Web Apps

Azure Static Web Apps is a great hosting solution for React applications with built-in CI/CD.

### Method 1: Deploy via Azure Portal

#### Step 1: Build the Application

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

#### Step 2: Create a Static Web App

1. Go to the [Azure Portal](https://portal.azure.com)
2. Search for "Static Web Apps" and click **Create**
3. Fill in the details:
   - **Resource Group**: Create new or select existing
   - **Name**: Your app name (e.g., `react-b2c-app`)
   - **Region**: Choose a region close to you
   - **Deployment source**: Choose **Other** (we'll deploy manually)
4. Click **Review + Create**, then **Create**

#### Step 3: Install Azure Static Web Apps CLI

```bash
npm install -g @azure/static-web-apps-cli
```

#### Step 4: Deploy

```bash
# Login to Azure
az login

# Deploy the build folder
swa deploy ./build --app-name react-b2c-app --resource-group your-resource-group
```

### Method 2: Deploy via GitHub Actions (Recommended)

#### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### Step 2: Create Static Web App with GitHub Integration

1. In Azure Portal, create a new Static Web App
2. Choose **GitHub** as deployment source
3. Authorize Azure to access your GitHub account
4. Select your repository and branch
5. Build configuration:
   - **App location**: `/`
   - **Api location**: (leave empty)
   - **Output location**: `build`
6. Click **Review + Create**, then **Create**

Azure will automatically create a GitHub Actions workflow in your repository.

#### Step 3: Update Azure B2C Redirect URI

1. Go to your app registration in Azure AD B2C
2. Add your Static Web App URL as a redirect URI:
   - Format: `https://your-app-name.azurestaticapps.net`
3. Click **Save**

#### Step 4: Update authConfig.js (Optional)

For production, you may want to use environment-specific configurations:

```javascript
const isProduction = window.location.hostname !== 'localhost';

export const msalConfig = {
  auth: {
    clientId: isProduction ? 'PROD_CLIENT_ID' : 'DEV_CLIENT_ID',
    // ... other settings
  },
};
```

Or use Azure Static Web Apps application settings to inject environment variables.

### Configure Static Web App Settings

1. In Azure Portal, go to your Static Web App
2. Navigate to **Configuration**
3. Add application settings:
   - `REACT_APP_B2C_CLIENT_ID`
   - `REACT_APP_B2C_TENANT_NAME`
   - etc.

### Custom Domain (Optional)

1. In your Static Web App, go to **Custom domains**
2. Click **Add** and follow the instructions to add your custom domain
3. Update the redirect URI in Azure B2C to include your custom domain

## Project Structure

```
react-azure-b2c-app/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── SignInButton.js     # Sign-in button component
│   │   ├── SignInButton.css
│   │   ├── SignOutButton.js    # Sign-out button component
│   │   ├── SignOutButton.css
│   │   ├── ProfileContent.js   # User profile display
│   │   └── ProfileContent.css
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── authConfig.js           # Azure B2C configuration
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
├── README.md                   # This file
└── staticwebapp.config.json    # Static Web App configuration
```

## Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem**: Cross-origin request blocked errors in browser console.

**Solution**: 
- Ensure your redirect URI is registered in Azure AD B2C
- Check that the redirect URI matches exactly (including protocol and port)

#### 2. Popup Blocked

**Problem**: Authentication popup is blocked by browser.

**Solution**:
- Allow popups for your application domain
- Or switch to redirect authentication flow in `authConfig.js`:
  ```javascript
  // Use redirect instead of popup
  instance.loginRedirect(loginRequest);
  ```

#### 3. "Invalid Client" Error

**Problem**: Authentication fails with "invalid client" error.

**Solution**:
- Verify your Client ID in `authConfig.js`
- Ensure the app registration is in the correct B2C tenant

#### 4. User Flow Not Found

**Problem**: Error stating user flow doesn't exist.

**Solution**:
- Verify user flow names in Azure B2C match those in `authConfig.js`
- Check that user flows are created and published

#### 5. Token Storage Issues

**Problem**: Users are logged out after closing browser tab.

**Solution**:
- Change `cacheLocation` to `localStorage` in `authConfig.js` for persistent sessions:
  ```javascript
  cache: {
    cacheLocation: 'localStorage',
  }
  ```

### Debugging Tips

1. **Enable MSAL Logging**:
   ```javascript
   const msalConfig = {
     // ... existing config
     system: {
       loggerOptions: {
         loggerCallback: (level, message, containsPii) => {
           console.log(message);
         },
         logLevel: 'Verbose',
       },
     },
   };
   ```

2. **Check Browser Console**: Look for detailed error messages

3. **Verify Network Traffic**: Use browser DevTools Network tab to inspect requests

4. **Azure B2C Logs**: Check sign-in logs in Azure Portal under Azure AD B2C

## Additional Resources

- [Azure AD B2C Documentation](https://docs.microsoft.com/azure/active-directory-b2c/)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [React Documentation](https://reactjs.org/)

## Support

For issues and questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review Azure AD B2C documentation
- Check MSAL.js GitHub issues

## License

This project is provided as-is for educational and demonstration purposes.
