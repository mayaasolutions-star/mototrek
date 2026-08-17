/**
 * Multi-Channel Notification Service Boundary
 */

class NotificationService {
  /**
   * Send Customer Transactional Email
   */
  async sendEmail(to, subject, templateName, data) {
    console.log(`[Notification Service] Email queued for ${to}: ${subject}`);
  }

  /**
   * Send Customer WhatsApp Notification
   */
  async sendWhatsApp(phone, message) {
    console.log(`[Notification Service] WhatsApp queued for ${phone}`);
  }

  /**
   * Notify Admin Dashboard / Store Operations
   */
  async notifyAdmin(title, payload) {
    console.log(`[Notification Service] Admin alert: ${title}`);
  }
}

module.exports = new NotificationService();
