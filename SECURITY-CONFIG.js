/* H4SX Gateway - Security Configuration */
/* Edit this file to customize security settings */

const SECURITY_CONFIG = {
  // Domain Whitelist - Add your authorized domains here
  ALLOWED_DOMAINS: [
    'localhost',
    '127.0.0.1',
    'h4sxmy.xyz',
    'www.h4sxmy.xyz'
    // Add more domains as needed
  ],
  
  // License Key - Change this to your custom license key
  LICENSE_KEY: 'H4SX-LICENSE-KEY-2024',
  
  // Encryption Key - Change this to your custom encryption key
  ENCRYPTION_KEY: 'H4SX-ENCRYPTION-KEY-2024',
  
  // Security Features
  FEATURES: {
    DOMAIN_CHECK: true,          // Enable domain whitelist check
    ANTI_COPYING: true,          // Disable right-click, copy, drag
    ANTI_DEBUGGING: true,        // Detect developer tools
    OBFUSCATION: true,           // Basic code obfuscation
    INTEGRITY_CHECK: true,       // Script version validation
    LICENSE_VALIDATION: true,    // License key validation
    ENCRYPTED_STORAGE: true      // Encrypted localStorage
  },
  
  // Security Messages
  MESSAGES: {
    DOMAIN_DENIED: '🔒 Access Denied - This content is protected and can only be accessed from authorized domains.',
    DEBUGGING_DETECTED: '🔒 Debugging Detected - Please close your developer tools to continue.',
    LICENSE_INVALID: '🔒 License Invalid - Please contact the administrator.',
    INTEGRITY_VIOLATION: '🔒 Security Violation - Invalid script version. Please refresh the page.'
  }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SECURITY_CONFIG;
}