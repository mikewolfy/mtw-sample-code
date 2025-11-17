# React Social Authentication Demo

A modern React.js application demonstrating multiple authentication patterns including Google OAuth and traditional username/password login. This app showcases both popup and inline login experiences with a beautiful, responsive UI.

## 🌟 Features

- **Multiple Authentication Methods**
  - Google OAuth 2.0 Integration
  - Traditional Username/Password login
  - Email OTP (One-Time Password) verification
- **Flexible Display Modes**
  - Popup Modal Login - Login form appears in an overlay
  - Inline Login - Traditional full-page login experience
- **Interactive Demo** - Landing page with buttons to try different login patterns
- **JWT Token Decoding** - Automatic decoding and display of user profile information
- **Modern UI** - Beautiful gradient design with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Profile Dashboard** - Displays user information including name, email, profile picture, and more
- **Secure Token Handling** - Proper JWT token management

## 🎯 Demo Experience

The application provides a landing page where users can explore two different authentication patterns:

1. **Popup Login** - Click to open a modal overlay with login options (best for single-page apps)
2. **Inline Login** - Navigate to a dedicated login page (traditional approach)

Both modes include:
- Username/Password authentication
- Email OTP (One-Time Password) verification
- Google Social Login
- Clean, modern interface

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 14.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Visual Studio Code** - [Download here](https://code.visualstudio.com/)
- **Google Account** - Required for OAuth configuration

## 🔧 Configuration

### Step 1: Set Up Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost`
   - Add authorized redirect URIs:
     - `http://localhost:3000`
   - Click "Create"
5. Copy your **Client ID** (it will look like: `xxxxx.apps.googleusercontent.com`)

### Step 2: Configure Environment Variables

1. In the project root directory, create a `.env` file:
   ```bash
   copy .env.example .env
   ```

2. Open the `.env` file and add your Google Client ID:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```

   **Important:** Replace `your-actual-client-id.apps.googleusercontent.com` with your actual Client ID from Google Cloud Console.

## 🚀 Installation & Setup

### Step 1: Open in Visual Studio Code

1. Open Visual Studio Code
2. Click **File** → **Open Folder**
3. Navigate to `c:\GitHub\mtw-sample-code\src\ReactSocial` and select it
4. The folder will open in VS Code

### Step 2: Install Dependencies

Open the integrated terminal in VS Code:
- Press `` Ctrl + ` `` (backtick) or go to **Terminal** → **New Terminal**

Run the following command to install all dependencies:

```powershell
npm install
```

This will install:
- React and React DOM
- @react-oauth/google (Google OAuth library)
- jwt-decode (JWT token decoder)
- react-scripts (Create React App tooling)

### Step 3: Start the Development Server

In the terminal, run:

```powershell
npm start
```

The application will:
- Compile and start on `http://localhost:3000`
- Automatically open in your default browser
- Enable hot-reloading (changes will auto-refresh)

## 📖 How the Application Works

### Architecture Overview

```
┌──────────────────────────────────────────┐
│           App Component                  │
│  (Manages authentication state & modes)  │
└─────────────┬────────────────────────────┘
              │
      ┌───────┴────────────────┐
      │                        │
      ▼                        ▼
┌──────────────┐         ┌─────────────┐
│ LandingPage  │         │  Dashboard  │
│  Component   │         │  Component  │
└──────┬───────┘         └─────────────┘
       │
   ┌───┴────┐
   ▼        ▼
┌─────┐  ┌───────────┐
│Login│  │LoginModal │
└─────┘  └───────────┘
```

### Component Breakdown

#### 1. **App.js** (Main Component)
- Wraps the entire app with `GoogleOAuthProvider`
- Manages user authentication state
- Controls display mode (landing, inline, popup, authenticated)
- Conditionally renders appropriate components
- Validates Google Client ID configuration

#### 2. **LandingPage.js** (Demo Selection Component)
- Initial page users see
- Displays demo options with buttons
- Explains the difference between popup and inline login
- Shows feature highlights

#### 3. **Login.js** (Authentication Component)
- Displays login form with username/password fields
- Includes Email OTP verification flow
- Includes Google Sign-In button
- Tab-based interface to switch between authentication methods
- Handles all authentication methods
- Supports modal and inline display modes
- Provides form validation
- OTP generation and verification (demo mode)

#### 4. **LoginModal.js** (Modal Wrapper Component)
- Wraps Login component in a modal overlay
- Provides backdrop and close functionality
- Handles click-outside-to-close behavior
- Smooth animations for open/close

#### 5. **Dashboard.js** (User Profile Component)
- Decodes JWT token for Google logins
- Displays user profile for all login types (Google, Username/Password, OTP)
- Shows different information based on login method
- Provides logout functionality
- Displays JWT token for Google authentication
- Shows verification status for OTP logins

### Authentication Flow

#### Popup Login Flow:
```
1. User clicks "Try Popup Login" on landing page
          ↓
2. Modal overlay appears with login form
          ↓
3. User chooses authentication method:
   a) Username/Password: Fill form and submit
   b) Email OTP: Enter email → Receive OTP → Verify code
   c) Google: Click Google button → OAuth popup
          ↓
4. Credentials validated / Google returns JWT
          ↓
5. Modal closes, Dashboard displays
```

#### Inline Login Flow:
```
1. User clicks "Try Inline Login" on landing page
          ↓
2. Navigate to dedicated login page
          ↓
3. User chooses authentication method:
   a) Username/Password: Fill form and submit
   b) Email OTP: Enter email → Receive OTP → Verify code
   c) Google: Click Google button → OAuth popup
          ↓
4. Credentials validated / Google returns JWT
          ↓
5. Navigate to Dashboard
```

### JWT Token Structure

The Google OAuth token contains:
- **sub**: User's unique Google ID
- **name**: Full name
- **given_name**: First name
- **family_name**: Last name
- **picture**: Profile picture URL
- **email**: Email address
- **email_verified**: Email verification status
- **locale**: User's locale/language
- **iat**: Token issued at timestamp
- **exp**: Token expiration timestamp

### Email OTP Flow

The OTP authentication flow:
1. User enters their email address
2. System generates a 6-digit OTP code
3. OTP is displayed in demo mode (in production, sent via email service)
4. User enters the OTP code
5. System verifies the code
6. Upon success, user is authenticated

**Demo Mode**: The OTP is shown in an alert for demonstration purposes. In production:
- Integrate with email service (SendGrid, AWS SES, etc.)
- Set OTP expiration time (e.g., 5-10 minutes)
- Implement rate limiting to prevent abuse
- Store OTP securely (hashed) in database or cache
- Add resend functionality with cooldown period

## 🎨 Customization

### Styling

The app uses custom CSS for styling. You can modify:

- **App.css** - Main app container styles
- **LandingPage.css** - Landing page and demo buttons
- **Login.css** - Login form styles (both username/password and Google button)
- **LoginModal.css** - Modal overlay and popup styles
- **Dashboard.css** - Dashboard and profile styles
- **index.css** - Global styles and gradient background

### Modifying the Google Button

In `Login.js`, you can customize the Google button:

```javascript
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
  theme="outline"     // Options: outline, filled_blue, filled_black
  size="large"        // Options: large, medium, small
  text="signin_with"  // Button text
  shape="rectangular" // Options: rectangular, pill, circle, square
/>
```

### Simulating Username/Password Login

The current implementation uses a mock authentication for username/password. In production, you would:

```javascript
const handleUsernamePasswordSubmit = async (e) => {
  e.preventDefault();
  
  // Call your authentication API
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    onLoginSuccess({ type: 'username', data });
  } else {
    alert('Login failed: ' + data.message);
  }
};
```

### Implementing Production OTP Flow

To implement OTP in production:

```javascript
// Send OTP
const handleSendOtp = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  if (response.ok) {
    setOtpSent(true);
    alert('OTP sent to your email');
  } else {
    alert('Failed to send OTP');
  }
};

// Verify OTP
const handleVerifyOtp = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    onLoginSuccess({ type: 'otp', data });
  } else {
    alert('Invalid OTP');
  }
};
```

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder
- Optimizes for best performance
- Minifies code
- Hashes filenames for caching

### `npm run eject`
**Note: This is a one-way operation!**
- Ejects from Create React App
- Gives full control over configuration

## 📁 Project Structure

```
ReactSocial/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── LandingPage.js      # Landing/demo page component
│   │   ├── LandingPage.css     # Landing page styles
│   │   ├── Login.js            # Login component (username/password + Google)
│   │   ├── Login.css           # Login form styles
│   │   ├── LoginModal.js       # Modal wrapper for login
│   │   ├── LoginModal.css      # Modal overlay styles
│   │   ├── Dashboard.js        # Dashboard component
│   │   └── Dashboard.css       # Dashboard styles
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables (create this)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use environment variables** - Keep API keys out of source code
3. **HTTPS in production** - Always use HTTPS for OAuth in production
4. **Validate tokens** - Always verify JWT tokens on the backend
5. **Limit OAuth scopes** - Only request necessary permissions
6. **Keep dependencies updated** - Regularly update packages for security patches

## 🐛 Troubleshooting

### Error: "Google Client ID is not configured"
- Ensure you created a `.env` file in the project root
- Verify the Client ID is correctly copied from Google Cloud Console
- Restart the development server after creating/modifying `.env`

### Error: "origin_mismatch" or "redirect_uri_mismatch"
- Check that `http://localhost:3000` is added to authorized origins in Google Cloud Console
- Ensure there are no trailing slashes in the URLs
- Wait a few minutes for Google's changes to propagate

### Login popup blocked
- Allow popups for `localhost:3000` in your browser
- Try using Chrome or Edge (best compatibility)
- Check browser console for specific errors

### Port 3000 already in use
- Close other applications using port 3000
- Or specify a different port: `$env:PORT=3001; npm start`

### Modal not closing when clicking backdrop
- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Try refreshing the page

### Username/Password login not working
- Note: This is a demo implementation that simulates authentication
- Any username/password combination will work for demonstration purposes
- In production, implement proper backend authentication

### Email OTP not receiving code
- Note: This is a demo implementation that displays OTP in an alert
- In production, integrate with email service (SendGrid, AWS SES, Mailgun, etc.)
- Check browser console for the generated OTP during demo
- Any 6-digit code matching the generated OTP will work

### OTP verification failing
- Ensure you're entering the exact 6-digit code shown in the alert
- OTP is case-sensitive and must match exactly
- In demo mode, check the browser console for the OTP
- Try clicking "Resend OTP" to generate a new code

## 🔒 Security Considerations: Modal/Popup vs Full Redirect Authentication

When implementing authentication flows, the choice between modal/popup windows and full-page redirects has significant security implications. Understanding these trade-offs is crucial for building secure applications.

### Authentication Pattern Comparison

#### 1. Full-Page Redirect (Most Secure)

**How it works:**
- User is redirected to a separate authentication page/domain
- Credentials are entered on a dedicated, isolated page
- After authentication, user is redirected back to the application

**✅ Benefits:**
- **Strongest security posture** - Credentials entered on isolated page
- **Clear URL visibility** - Users can verify they're on the correct authentication domain
- **Browser security features** - Full benefit of browser's built-in protections
- **Industry standard** - Used by banks, OAuth providers (e.g., Google, Microsoft)
- **XSS isolation** - Vulnerabilities in main app don't affect auth page
- **CSRF protection** - Easier to implement anti-CSRF tokens
- **Password manager compatibility** - Better support for autofill
- **No iframe vulnerabilities** - Eliminates clickjacking and UI redressing attacks

**❌ Risks/Drawbacks:**
- **User experience disruption** - Context switching can be jarring
- **State management complexity** - Must preserve application state across redirects
- **Slower perceived performance** - Full page reload feels slower
- **Mobile challenges** - Deep linking and app-to-browser transitions can be problematic

**🎯 Best For:**
- Production applications handling sensitive data
- Financial services and healthcare applications
- Applications requiring high security compliance (PCI-DSS, HIPAA)
- OAuth/SAML authentication flows
- Enterprise single sign-on (SSO) implementations

---

#### 2. Modal/Popup Window (Convenience with Risks)

**How it works:**
- Authentication form appears as overlay on current page
- User stays within the same application context
- Credentials captured in JavaScript-controlled element

**✅ Benefits:**
- **Seamless user experience** - No context switching or page reload
- **Application state preservation** - No need to save/restore state
- **Faster perceived performance** - Instant display, no full page load
- **Modern UX** - Aligns with single-page application (SPA) patterns
- **Reduced friction** - Users less likely to abandon authentication flow
- **Easier testing** - No complex redirect flows to test

**❌ Risks/Security Concerns:**

**Critical Security Vulnerabilities:**

1. **Cross-Site Scripting (XSS) Exposure**
   - If your application has any XSS vulnerability, attackers can inject code to capture credentials
   - Malicious scripts can read input fields in the modal
   - Keyloggers can be injected to capture every keystroke
   - **Impact:** Complete credential compromise

2. **Clickjacking/UI Redressing**
   - Attackers can overlay invisible iframes over the modal
   - Users think they're clicking login button but actually triggering malicious actions
   - Transparent overlays can capture credentials
   - **Impact:** Credential theft, unauthorized actions

3. **JavaScript Context Vulnerability**
   - All JavaScript on the page has access to modal DOM
   - Browser extensions can access and manipulate modal content
   - Third-party scripts (analytics, ads) could be compromised
   - **Impact:** Credential interception by malicious code

4. **Limited URL Verification**
   - Users cannot verify URL authenticity in a modal
   - Phishing becomes easier as no address bar is visible
   - Users can't distinguish legitimate modal from fake overlay
   - **Impact:** Increased phishing susceptibility

5. **DOM Manipulation Attacks**
   - Attackers can use browser dev tools or extensions to modify modal
   - Form action can be changed to send credentials to attacker
   - Input field values can be intercepted before submission
   - **Impact:** Credential exfiltration

6. **Memory Exposure**
   - Credentials temporarily stored in JavaScript variables
   - Browser debugging tools can inspect application memory
   - Browser history/cache may retain sensitive data
   - **Impact:** Information leakage

7. **Session Fixation**
   - Harder to implement proper session rotation with modals
   - Attack surface for session hijacking increases
   - **Impact:** Account takeover

**🚫 NOT Recommended For:**
- Production applications with real user data
- Applications handling payment information
- Healthcare or financial services
- Applications requiring compliance certifications
- Multi-tenant SaaS platforms

**✓ Acceptable For:**
- Demo/prototype applications (like this one)
- Internal tools with trusted users
- Development/testing environments
- Applications with additional security layers (e.g., OAuth only, no password handling)

---

#### 3. Social Authentication (Google OAuth) - Hybrid Approach

**How it works:**
- Button triggers OAuth flow
- Google opens popup or redirect to their authentication page
- Credentials entered on Google's domain (accounts.google.com)
- Token returned to your application

**✅ Benefits:**
- **Credentials never touch your application** - Google handles all sensitive data
- **Google's security infrastructure** - Enterprise-grade security
- **No password storage** - No responsibility for credential management
- **Multi-factor authentication** - Inherits Google's MFA
- **Phishing resistant** - Users authenticate on Google's domain
- **Reduced liability** - Credential breaches are Google's responsibility
- **Better UX** - One-click login for existing Google users

**❌ Risks/Drawbacks:**
- **Third-party dependency** - Reliance on Google's availability
- **Privacy concerns** - Google tracks user authentication
- **Account linking complexity** - Managing multiple auth methods per user
- **Token security** - JWT tokens must be properly validated and stored
- **Limited control** - Can't customize Google's authentication flow
- **Vendor lock-in** - Switching providers requires user migration

**🎯 Best For:**
- Consumer applications
- Applications targeting Google Workspace users
- Rapid prototyping and MVPs
- Applications prioritizing convenience
- Situations where you want to avoid credential management

---

#### 4. Email OTP (One-Time Password)

**How it works:**
- User enters email address
- System generates and sends temporary code via email
- User enters code to authenticate

**✅ Benefits:**
- **No password storage** - Eliminates password management burden
- **Built-in email verification** - Confirms email ownership
- **Temporary credentials** - OTP expires after short time
- **Phishing resistant** - Even if OTP is phished, it expires quickly
- **User-friendly** - No password to remember
- **Passwordless authentication** - Modern, secure approach

**❌ Risks/Security Concerns:**

1. **Email Security Dependency**
   - Security relies on email account security
   - Email accounts often have weak passwords
   - Email can be intercepted in transit
   - **Mitigation:** Use TLS for email delivery, implement rate limiting

2. **OTP Interception**
   - Man-in-the-middle attacks on email
   - Email provider breaches
   - Forwarding rules or compromised email accounts
   - **Mitigation:** Short expiration times (5-10 minutes), one-time use

3. **Brute Force Attacks**
   - 6-digit codes have only 1 million combinations
   - Automated attacks can attempt many codes
   - **Mitigation:** Rate limiting, account lockout, CAPTCHA

4. **Phishing Risks**
   - Users can be tricked into entering OTP on fake site
   - Social engineering attacks
   - **Mitigation:** User education, domain verification in emails

5. **Email Delivery Issues**
   - Spam filters may block OTP emails
   - Delayed delivery can frustrate users
   - Email outages prevent authentication
   - **Mitigation:** Multiple delivery channels, reliable email service provider

**🎯 Best For:**
- Secondary authentication (2FA/MFA)
- Account recovery flows
- Email verification processes
- Low-security consumer applications
- Supplementing password authentication

---

### Security Best Practices by Pattern

#### For Modal/Popup Authentication:
1. **Use HTTPS exclusively** - Encrypt all data in transit
2. **Implement Content Security Policy (CSP)** - Prevent XSS attacks
3. **Use httpOnly cookies for sessions** - Prevent JavaScript access
4. **Never store credentials in localStorage** - Use secure session cookies
5. **Implement proper input validation** - Prevent injection attacks
6. **Use CAPTCHA** - Prevent automated attacks
7. **Add X-Frame-Options header** - Prevent clickjacking
8. **Implement rate limiting** - Prevent brute force attacks
9. **Audit third-party scripts** - Remove unnecessary dependencies
10. **Use SameSite cookie attribute** - Prevent CSRF attacks

#### For Full-Page Redirect:
1. **Use dedicated authentication domain** - Isolate credentials from main app
2. **Implement OAuth 2.0 / OIDC** - Use industry-standard protocols
3. **Validate redirect URIs** - Prevent open redirect vulnerabilities
4. **Use state parameters** - Prevent CSRF attacks
5. **Implement PKCE** - Enhance security for public clients
6. **Short-lived tokens** - Reduce impact of token theft
7. **Refresh token rotation** - Detect and prevent token replay
8. **Proper session management** - Secure session creation and destruction

#### For Social Authentication:
1. **Validate JWT signatures** - Verify tokens are from Google
2. **Check token expiration** - Don't accept expired tokens
3. **Verify audience claim** - Ensure token is for your application
4. **Verify issuer** - Confirm token is from Google
5. **Use HTTPS redirect URIs only** - Prevent token interception
6. **Implement token storage securely** - httpOnly cookies or secure storage
7. **Handle token refresh** - Gracefully manage expired sessions

#### For Email OTP:
1. **Short expiration times** - 5-10 minutes maximum
2. **One-time use only** - Invalidate after successful authentication
3. **Rate limit OTP generation** - Prevent abuse (e.g., 3 attempts per hour)
4. **Rate limit verification attempts** - Prevent brute force (e.g., 5 attempts per OTP)
5. **Use cryptographically secure random** - Proper OTP generation
6. **Log all OTP attempts** - Monitor for suspicious activity
7. **Include context in email** - Help users identify legitimate OTPs
8. **Implement account lockout** - After excessive failed attempts
9. **Use TLS for email delivery** - Encrypt OTPs in transit
10. **Don't log OTP values** - Prevent information leakage

---

### Recommendations for Production

**High Security Requirements (Financial, Healthcare):**
- ✅ Use full-page redirect with OAuth 2.0/OIDC
- ✅ Implement MFA (OTP as second factor)
- ✅ Use dedicated authentication domain
- ❌ Avoid modal-based password entry
- ✅ Regular security audits and penetration testing

**Standard SaaS Applications:**
- ✅ Use social authentication (Google, Microsoft, etc.)
- ✅ Full-page redirect for password authentication
- ✅ Email OTP for passwordless option
- ⚠️ Modal authentication only with OAuth (no password capture)
- ✅ Implement proper token management

**Internal Tools:**
- ✅ Enterprise SSO (SAML, OIDC)
- ✅ Full-page redirect
- ⚠️ Modal acceptable with strong CSP and security controls
- ✅ Integration with existing identity provider

**Prototypes/Demos (like this application):**
- ✅ Modal acceptable for demonstration purposes
- ✅ Clearly label as demo/not production-ready
- ✅ Use for learning and testing UX patterns
- ❌ Do not use with real user credentials
- ✅ Include security warnings in documentation

---

### Key Takeaway

**For production applications handling real user credentials, always prefer full-page redirects to dedicated authentication pages or use social authentication providers.** Modal-based authentication is convenient but introduces significant security risks that are difficult to fully mitigate. The only exception is when using OAuth flows where credentials are entered on the identity provider's domain, not in your modal.

This demo application uses modals to showcase different UX patterns for educational purposes only. In a production environment, implement proper redirect-based authentication or delegate to trusted identity providers.

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [JWT.io - JWT Decoder](https://jwt.io/)
- [Create React App Documentation](https://create-react-app.dev/)

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development Notes

### Testing with Different Accounts
- You can test with multiple Google accounts
- Use browser incognito mode for testing with different accounts
- Clear browser cache if experiencing authentication issues

### Production Deployment
When deploying to production:
1. Add your production domain to Google Cloud Console authorized origins
2. Update the `.env` with production credentials
3. Run `npm run build` to create optimized production build
4. Deploy the `build` folder to your hosting service
5. Ensure HTTPS is enabled

---

**Happy Coding! 🚀**

If you encounter any issues or have questions, please check the troubleshooting section or refer to the additional resources.
