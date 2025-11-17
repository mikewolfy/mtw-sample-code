import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage({ onShowPopupLogin, onShowInlineLogin }) {
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);

  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-header">
          <h1>🚀 Social Authentication Demo</h1>
          <p>Explore different ways to display authentication options</p>
        </div>
        
        <div className="demo-section">
          <h2>Choose Your Login Experience</h2>
          <p className="demo-description">
            This demo showcases two common patterns for implementing authentication:
          </p>
          
          <div className="button-grid">
            <div className="demo-option">
              <div className="option-icon">🪟</div>
              <h3>Popup Login</h3>
              <p>
                Login form appears in a modal overlay. Best for keeping users 
                on the current page while authenticating.
              </p>
              <button 
                className="demo-btn popup-btn" 
                onClick={onShowPopupLogin}
              >
                Try Popup Login
              </button>
            </div>
            
            <div className="demo-option">
              <div className="option-icon">📄</div>
              <h3>Inline Login</h3>
              <p>
                Login form embedded directly in the page. Traditional approach 
                with dedicated login page experience.
              </p>
              <button 
                className="demo-btn inline-btn" 
                onClick={onShowInlineLogin}
              >
                Try Inline Login
              </button>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h3>Features Included</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <span>Username/Password Authentication</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📧</span>
              <span>Email OTP Verification</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <span>Google Social Login</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Modern UI/UX Design</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Responsive Layout</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <span>Multiple Auth Patterns</span>
            </div>
          </div>
        </div>

        {/* Security Comparison Section */}
        <div className="security-section">
          <div className="section-header">
            <h3>🔒 Security Considerations</h3>
            <button 
              className="toggle-btn"
              onClick={() => setShowSecurityDetails(!showSecurityDetails)}
            >
              {showSecurityDetails ? '− Hide Details' : '+ Show Details'}
            </button>
          </div>
          
          <p className="security-intro">
            Understanding the security implications of different authentication patterns
          </p>

          {showSecurityDetails && (
            <div className="security-details">
              {/* Authentication Methods Comparison */}
              <div className="auth-method">
                <div className="method-header redirect">
                  <span className="method-icon">🔄</span>
                  <h4>Full-Page Redirect</h4>
                  <span className="security-badge high">Most Secure</span>
                </div>
                <div className="method-content">
                  <div className="pros">
                    <strong>✅ Benefits:</strong>
                    <ul>
                      <li>Strongest security posture - Credentials on isolated page</li>
                      <li>Clear URL visibility - Users can verify authentication domain</li>
                      <li>Browser security features - Full built-in protections</li>
                      <li>Industry standard - Used by banks and OAuth providers</li>
                      <li>XSS isolation - Main app vulnerabilities don't affect auth</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <strong>❌ Drawbacks:</strong>
                    <ul>
                      <li>User experience disruption - Context switching</li>
                      <li>State management complexity - Must preserve app state</li>
                      <li>Slower perceived performance - Full page reload</li>
                    </ul>
                  </div>
                  <div className="use-case">
                    <strong>🎯 Best For:</strong> Production apps, financial services, healthcare, 
                    high-security requirements
                  </div>
                </div>
              </div>

              <div className="auth-method">
                <div className="method-header modal">
                  <span className="method-icon">🪟</span>
                  <h4>Modal/Popup Window</h4>
                  <span className="security-badge low">Higher Risk</span>
                </div>
                <div className="method-content">
                  <div className="pros">
                    <strong>✅ Benefits:</strong>
                    <ul>
                      <li>Seamless user experience - No context switching</li>
                      <li>Application state preservation - No save/restore needed</li>
                      <li>Faster perceived performance - Instant display</li>
                      <li>Modern UX - Aligns with SPA patterns</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <strong>❌ Security Risks:</strong>
                    <ul>
                      <li><strong>XSS Exposure:</strong> Any XSS vulnerability can capture credentials</li>
                      <li><strong>Clickjacking:</strong> Invisible overlays can steal credentials</li>
                      <li><strong>JavaScript Access:</strong> All page scripts can access modal</li>
                      <li><strong>No URL Verification:</strong> Users can't verify authenticity</li>
                      <li><strong>DOM Manipulation:</strong> Attackers can modify form behavior</li>
                      <li><strong>Memory Exposure:</strong> Credentials in JavaScript variables</li>
                    </ul>
                  </div>
                  <div className="use-case">
                    <strong>🎯 Best For:</strong> Demos/prototypes, OAuth flows (not password capture), 
                    internal tools with trusted users
                  </div>
                </div>
              </div>

              <div className="auth-method">
                <div className="method-header social">
                  <span className="method-icon">🌐</span>
                  <h4>Social Authentication (OAuth)</h4>
                  <span className="security-badge high">Recommended</span>
                </div>
                <div className="method-content">
                  <div className="pros">
                    <strong>✅ Benefits:</strong>
                    <ul>
                      <li>Credentials never touch your application</li>
                      <li>Google's enterprise-grade security infrastructure</li>
                      <li>No password storage responsibility</li>
                      <li>Inherits provider's MFA capabilities</li>
                      <li>Phishing resistant - Auth on provider's domain</li>
                      <li>Reduced liability for credential breaches</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <strong>❌ Drawbacks:</strong>
                    <ul>
                      <li>Third-party dependency - Relies on provider availability</li>
                      <li>Privacy concerns - Provider tracks authentication</li>
                      <li>Limited control - Can't customize auth flow</li>
                      <li>Token security - Must properly validate JWT tokens</li>
                    </ul>
                  </div>
                  <div className="use-case">
                    <strong>🎯 Best For:</strong> Consumer apps, rapid prototyping, 
                    avoiding credential management
                  </div>
                </div>
              </div>

              <div className="auth-method">
                <div className="method-header otp">
                  <span className="method-icon">📧</span>
                  <h4>Email OTP (One-Time Password)</h4>
                  <span className="security-badge medium">Moderate Security</span>
                </div>
                <div className="method-content">
                  <div className="pros">
                    <strong>✅ Benefits:</strong>
                    <ul>
                      <li>No password storage - Eliminates password management</li>
                      <li>Built-in email verification</li>
                      <li>Temporary credentials - Expires quickly</li>
                      <li>Phishing resistant - OTP expires after use</li>
                      <li>User-friendly - No password to remember</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <strong>❌ Security Risks:</strong>
                    <ul>
                      <li><strong>Email Dependency:</strong> Security relies on email account</li>
                      <li><strong>Interception:</strong> OTP can be intercepted in transit</li>
                      <li><strong>Brute Force:</strong> 6-digit codes have limited combinations</li>
                      <li><strong>Phishing:</strong> Users can be tricked into sharing OTP</li>
                      <li><strong>Delivery Issues:</strong> Spam filters or email outages</li>
                    </ul>
                  </div>
                  <div className="use-case">
                    <strong>🎯 Best For:</strong> Secondary authentication (2FA), account recovery, 
                    email verification
                  </div>
                </div>
              </div>

              {/* Security Best Practices */}
              <div className="best-practices">
                <h4>🛡️ Security Best Practices</h4>
                <div className="practices-grid">
                  <div className="practice-card">
                    <h5>For Modal Authentication:</h5>
                    <ul>
                      <li>Use HTTPS exclusively</li>
                      <li>Implement Content Security Policy (CSP)</li>
                      <li>Use httpOnly cookies for sessions</li>
                      <li>Never store credentials in localStorage</li>
                      <li>Add rate limiting and CAPTCHA</li>
                    </ul>
                  </div>
                  <div className="practice-card">
                    <h5>For OAuth/Social:</h5>
                    <ul>
                      <li>Validate JWT signatures</li>
                      <li>Check token expiration</li>
                      <li>Verify audience and issuer claims</li>
                      <li>Use HTTPS redirect URIs only</li>
                      <li>Implement secure token storage</li>
                    </ul>
                  </div>
                  <div className="practice-card">
                    <h5>For Email OTP:</h5>
                    <ul>
                      <li>Short expiration (5-10 minutes)</li>
                      <li>One-time use only</li>
                      <li>Rate limit generation and attempts</li>
                      <li>Use cryptographically secure random</li>
                      <li>Implement account lockout</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Production Recommendations */}
              <div className="recommendations">
                <h4>💡 Production Recommendations</h4>
                <div className="recommendation-grid">
                  <div className="recommendation-item high-security">
                    <strong>High Security (Financial/Healthcare):</strong>
                    <p>Full-page redirect with OAuth 2.0/OIDC + MFA. Dedicated authentication domain. 
                    Regular security audits.</p>
                  </div>
                  <div className="recommendation-item standard">
                    <strong>Standard SaaS Applications:</strong>
                    <p>Social authentication (Google, Microsoft) + Full-page redirect for passwords. 
                    Email OTP for passwordless option.</p>
                  </div>
                  <div className="recommendation-item demo">
                    <strong>Demos/Prototypes:</strong>
                    <p>Modal acceptable for demonstration. Clearly label as not production-ready. 
                    Never use with real user credentials.</p>
                  </div>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="key-takeaway">
                <h4>🔑 Key Takeaway</h4>
                <p>
                  <strong>For production applications handling real user credentials, always prefer 
                  full-page redirects or social authentication providers.</strong> Modal-based password 
                  authentication introduces significant security risks. This demo uses modals for 
                  educational purposes only.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
