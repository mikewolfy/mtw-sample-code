# React Social Authentication App

A modern React.js application demonstrating Google OAuth authentication integration. This app provides a complete authentication flow with a beautiful UI and user profile display.

## 🌟 Features

- **Google OAuth 2.0 Integration** - Secure authentication using Google accounts
- **JWT Token Decoding** - Automatic decoding and display of user profile information
- **Modern UI** - Beautiful gradient design with smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Profile Dashboard** - Displays user information including name, email, profile picture, and more
- **One-Tap Sign-In** - Quick authentication using Google One Tap
- **Secure Token Handling** - Proper JWT token management

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
┌─────────────────────────────────────────┐
│           App Component                 │
│  (Manages authentication state)         │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
      ▼                ▼
┌──────────┐     ┌─────────────┐
│  Login   │     │  Dashboard  │
│Component │     │  Component  │
└──────────┘     └─────────────┘
```

### Component Breakdown

#### 1. **App.js** (Main Component)
- Wraps the entire app with `GoogleOAuthProvider`
- Manages user authentication state
- Conditionally renders Login or Dashboard components
- Validates Google Client ID configuration

#### 2. **Login.js** (Authentication Component)
- Displays the Google Sign-In button
- Handles successful and failed login attempts
- Uses `@react-oauth/google` library for OAuth integration
- Supports One-Tap sign-in for faster authentication

#### 3. **Dashboard.js** (User Profile Component)
- Decodes JWT token to extract user information
- Displays user profile including:
  - Profile picture
  - Full name and email
  - Email verification status
  - User ID and locale
  - Token issue and expiration times
- Provides logout functionality
- Shows a truncated view of the JWT token

### Authentication Flow

```
1. User clicks "Sign in with Google"
          ↓
2. Google OAuth popup appears
          ↓
3. User authenticates with Google
          ↓
4. Google returns a JWT credential token
          ↓
5. App decodes the token using jwt-decode
          ↓
6. User profile information is extracted
          ↓
7. Dashboard displays user information
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

## 🎨 Customization

### Styling

The app uses custom CSS for styling. You can modify:

- **App.css** - Main app container styles
- **Login.css** - Login page styles
- **Dashboard.css** - Dashboard and profile styles
- **index.css** - Global styles and gradient background

### Modifying the Google Button

In `Login.js`, you can customize the Google button:

```javascript
<GoogleLogin
  onSuccess={handleSuccess}
  onError={handleError}
  useOneTap          // Enable/disable One-Tap
  theme="filled_blue" // Options: outline, filled_blue, filled_black
  size="large"        // Options: large, medium, small
  text="signin_with"  // Button text
  shape="rectangular" // Options: rectangular, pill, circle, square
/>
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
│   │   ├── Login.js            # Login component
│   │   ├── Login.css           # Login styles
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
