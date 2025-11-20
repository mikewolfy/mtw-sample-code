import React from 'react';
import './AuthMethodSelector.css';

export const AuthMethodSelector = ({ onMethodSelect }) => {
  const authMethods = [
    {
      id: 'popup',
      icon: '🪟',
      title: 'Standard Popup',
      description: 'Opens Azure B2C in a new popup window',
      recommended: true,
      pros: [
        'Most secure - authentication in separate context',
        'Best user experience - familiar pattern',
        'No iframe restrictions or limitations',
        'Full Azure B2C branding and features'
      ],
      cons: [
        'Can be blocked by popup blockers',
        'Requires user to allow popups'
      ],
      security: 'High',
      ux: 'Excellent'
    },
    {
      id: 'iframe-embedded',
      icon: '🖼️',
      title: 'Embedded iFrame',
      description: 'Displays Azure B2C within the current page',
      recommended: false,
      pros: [
        'Seamless - stays within your application',
        'No popup blocker issues',
        'Consistent visual experience'
      ],
      cons: [
        'Security concerns - shared context',
        'May violate Azure B2C policies',
        'Clickjacking vulnerabilities possible',
        'Limited by X-Frame-Options headers',
        'Not recommended by Microsoft'
      ],
      security: 'Medium',
      ux: 'Good',
      warning: 'Azure B2C may block iframe embedding for security reasons'
    },
    {
      id: 'popup-iframe',
      icon: '🔲',
      title: 'Popup with iFrame',
      description: 'Opens a popup window that contains an embedded iframe',
      recommended: false,
      pros: [
        'Hybrid approach - separate window',
        'Additional UI control in popup',
        'Can add custom branding around iframe'
      ],
      cons: [
        'Complex architecture - two layers',
        'Still subject to iframe restrictions',
        'Can be blocked by popup blockers',
        'Increased maintenance complexity',
        'May violate security policies'
      ],
      security: 'Medium',
      ux: 'Fair',
      warning: 'Adds complexity without significant benefits'
    }
  ];

  return (
    <div className="auth-method-selector">
      <div className="selector-header">
        <h2>Choose Your Authentication Method</h2>
        <p className="selector-subtitle">
          Select how you'd like users to sign in to your application
        </p>
      </div>

      <div className="business-context">
        <div className="context-card">
          <h3>📊 For Business Decision Makers</h3>
          <p>
            <strong>Authentication method impacts both security and user experience.</strong> Azure Active Directory B2C 
            is Microsoft's enterprise-grade identity service that manages customer authentication. How you integrate it 
            affects your application's security posture and your users' perception of your brand.
          </p>
          <div className="context-points">
            <div className="context-point">
              <strong>Security:</strong> Authentication in separate contexts (popups) provides better isolation from 
              your application, reducing risks of credential theft and cross-site attacks.
            </div>
            <div className="context-point">
              <strong>User Experience:</strong> Users are familiar with popup authentication from major services like 
              Google and Microsoft. Embedded solutions may feel seamless but can raise security concerns.
            </div>
            <div className="context-point">
              <strong>Compliance:</strong> Industry standards (OAuth 2.0, OpenID Connect) and Microsoft's recommendations 
              favor popup/redirect methods over iframe embedding for authentication flows.
            </div>
          </div>
        </div>
      </div>

      <div className="methods-grid">
        {authMethods.map(method => (
          <div 
            key={method.id} 
            className={`method-card ${method.recommended ? 'recommended' : ''}`}
            onClick={() => onMethodSelect(method.id)}
          >
            {method.recommended && (
              <div className="recommended-badge">
                ⭐ Recommended
              </div>
            )}
            
            <div className="method-icon">{method.icon}</div>
            <h3>{method.title}</h3>
            <p className="method-description">{method.description}</p>

            {method.warning && (
              <div className="method-warning">
                ⚠️ {method.warning}
              </div>
            )}

            <div className="method-metrics">
              <div className="metric">
                <span className="metric-label">Security:</span>
                <span className={`metric-value ${method.security.toLowerCase()}`}>
                  {method.security}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">UX:</span>
                <span className={`metric-value ${method.ux.toLowerCase().replace(' ', '-')}`}>
                  {method.ux}
                </span>
              </div>
            </div>

            <div className="method-details">
              <div className="pros">
                <strong>✓ Advantages:</strong>
                <ul>
                  {method.pros.map((pro, idx) => (
                    <li key={idx}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <strong>✗ Considerations:</strong>
                <ul>
                  {method.cons.map((con, idx) => (
                    <li key={idx}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button className="select-method-btn">
              Try This Method →
            </button>
          </div>
        ))}
      </div>

      <div className="technical-note">
        <h4>🔧 Technical Implementation Notes</h4>
        <p>
          This demo uses <strong>Microsoft Authentication Library (MSAL)</strong> for JavaScript. 
          The standard popup method uses <code>loginPopup()</code>, which is the recommended approach. 
          The iframe demonstrations are provided for educational purposes to show alternative patterns, 
          but they may not work in production due to Azure B2C's security headers (X-Frame-Options, CSP).
        </p>
        <p>
          <strong>Production Recommendation:</strong> Use the Standard Popup or Redirect authentication flow. 
          Microsoft explicitly discourages iframe-based authentication for security reasons outlined in their 
          OAuth 2.0 best practices documentation.
        </p>
      </div>
    </div>
  );
};
