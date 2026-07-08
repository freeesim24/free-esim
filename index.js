/**
 * eSIM Profile Schema & Data Parser Utility
 * Purpose: Provides helper functions to validate, parse, and structure eSIM metadata 
 * and LPA (Local Profile Assistant) strings for global configurations.
 */

class ESimParser {
    /**
     * Parses a standard eSIM LPA activation string
     * @param {string} lpaString - The activation string (e.g., "LPA:1$rsp.example.com$MATCHING_KEY")
     */
    static parseLpa(lpaString) {
        if (!lpaString || !lpaString.startsWith('LPA:')) {
            throw new Error('Invalid format: String must begin with "LPA:"');
        }
        const segments = lpaString.substring(4).split('$');
        return {
            formatVersion: segments[0] || null,
            smdpHost: segments[1] || null,
            activationCode: segments[2] || null,
            confirmationCode: segments[3] || null
        };
    }

    /**
     * Validates an eSIM profile metadata configuration payload
     * @param {Object} config - Configuration metadata object
     */
    static validateConfig(config) {
        const required = ['carrier', 'supportedRegions', 'bandwidthLimitGb', 'isActive'];
        const missing = required.filter(key => !(key in config));
        
        return {
            valid: missing.length === 0,
            missingFields: missing
        };
    }
}

// Module export for utility integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESimParser;
}
