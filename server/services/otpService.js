// In-memory store for mock OTPs (in production, use Redis or a DB collection with TTL)
const otpStore = new Map();

class OtpService {
  /**
   * Send OTP to a phone number
   * @param {string} phoneNumber 
   * @returns {Promise<boolean>}
   */
  async sendOtp(phoneNumber) {
    // Generate a 6-digit mock OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry for 5 minutes
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(phoneNumber, { otp, expiresAt });
    
    // Log OTP clearly in the console for development testing
    console.log(`\n========================================`);
    console.log(`[OTP SERVICE] Mock OTP for ${phoneNumber}: ${otp}`);
    console.log(`========================================\n`);
    
    return true;
  }

  /**
   * Verify OTP for a phone number
   * @param {string} phoneNumber 
   * @param {string} otp 
   * @returns {Promise<boolean>}
   */
  async verifyOtp(phoneNumber, otp) {
    // Master bypass OTP for easy testing
    if (otp === '123456') {
      return true;
    }

    const record = otpStore.get(phoneNumber);
    if (!record) {
      return false;
    }

    // Check expiry
    if (Date.now() > record.expiresAt) {
      otpStore.delete(phoneNumber);
      return false;
    }

    const isValid = record.otp === otp;
    if (isValid) {
      // Clear OTP after successful verification to prevent reuse
      otpStore.delete(phoneNumber);
    }
    return isValid;
  }
}

module.exports = new OtpService();
