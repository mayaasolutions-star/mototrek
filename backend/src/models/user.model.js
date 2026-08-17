/**
 * User / Unified Customer Database Model
 */
const { hashPassword, verifyPassword } = require('../utils/hash');

const normalizePhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.toString().replace(/[^0-9]/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.slice(2);
  }
  if (cleaned.length === 10) {
    return cleaned;
  }
  return cleaned.length > 10 ? cleaned.slice(-10) : cleaned;
};

let USERS_DB = [];

class UserModel {
  static normalizePhone(phone) {
    return normalizePhone(phone);
  }

  static getAllUsers() {
    return USERS_DB.map(({ passwordHash, ...user }) => user);
  }

  static seedUsers(usersList) {
    USERS_DB = usersList.map((u, idx) => {
      const code = u.customerCode || (u.id && u.id.startsWith('MTK-C-') ? u.id : `MTK-C-${(idx + 1).toString().padStart(5, '0')}`);
      return {
        ...u,
        id: u.id || code,
        customerCode: code,
        mobile: normalizePhone(u.mobile),
        source: u.source || 'Website',
        status: u.status || 'Active',
      };
    });
    return UserModel.getAllUsers();
  }

  static findByMobile(mobile) {
    const cleanMobile = normalizePhone(mobile);
    if (!cleanMobile) return null;
    const user = USERS_DB.find((u) => normalizePhone(u.mobile) === cleanMobile);
    if (!user) return null;
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static findById(id) {
    if (!id) return null;
    const cleanId = String(id).trim();
    const user = USERS_DB.find(
      (u) =>
        u.id === cleanId ||
        u.customerCode === cleanId ||
        u.id === `usr-${cleanId}` ||
        (u.id && u.id.endsWith(cleanId)) ||
        (u.customerCode && u.customerCode.endsWith(cleanId))
    );
    if (!user) return null;
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async createUser({ name, email, mobile, password, source = 'Website' }) {
    const cleanMobile = normalizePhone(mobile);
    
    // Check if phone or email already exists
    const existing = USERS_DB.find((u) => 
      (cleanMobile && normalizePhone(u.mobile) === cleanMobile) || 
      (email && u.email && u.email.toLowerCase() === email.toLowerCase())
    );

    if (existing) {
      const err = new Error('Customer already exists with this phone or email number');
      err.existingUser = existing;
      throw err;
    }

    const nextSeq = (USERS_DB.length + 1).toString().padStart(5, '0');
    const newCustId = `MTK-C-${nextSeq}`;

    const newUser = {
      id: newCustId,
      name: name || 'Valued Rider',
      email: email || '',
      mobile: cleanMobile,
      passwordHash: hashPassword(password || 'Rider@2026'),
      createdAt: new Date().toISOString(),
      source: source,
      status: 'Active',
      addresses: [],
    };

    USERS_DB.push(newUser);
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static findOrCreateByMobile({ name, mobile, email, source = 'POS' }) {
    const cleanMobile = normalizePhone(mobile);
    if (cleanMobile) {
      const existing = USERS_DB.find((u) => normalizePhone(u.mobile) === cleanMobile);
      if (existing) {
        // Upgrade source if needed e.g. Website -> Website + POS
        if (existing.source === 'Website' && source === 'POS') {
          existing.source = 'Website + POS';
        }
        const { passwordHash, ...userWithoutPassword } = existing;
        return { user: userWithoutPassword, created: false };
      }
    }

    const nextSeq = (USERS_DB.length + 1).toString().padStart(5, '0');
    const newCustId = `MTK-C-${nextSeq}`;
    const newUser = {
      id: newCustId,
      name: name || 'Store Customer',
      email: email || (cleanMobile ? `${cleanMobile}@mototrek.in` : ''),
      mobile: cleanMobile || mobile || '',
      passwordHash: hashPassword('Rider@2026'),
      createdAt: new Date().toISOString(),
      source: source,
      status: 'Active',
      addresses: [],
    };

    USERS_DB.push(newUser);
    const { passwordHash, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, created: true };
  }

  static updateUser(id, updateData) {
    const idx = USERS_DB.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    USERS_DB[idx] = {
      ...USERS_DB[idx],
      ...updateData,
      id: USERS_DB[idx].id, // Customer ID never changes!
      mobile: updateData.mobile ? normalizePhone(updateData.mobile) : USERS_DB[idx].mobile,
    };
    const { passwordHash, ...userWithoutPassword } = USERS_DB[idx];
    return userWithoutPassword;
  }

  static async findByCredentials(identifier, password) {
    const cleanId = normalizePhone(identifier);
    const user = USERS_DB.find(
      (u) => u.email.toLowerCase() === identifier.toLowerCase() || (cleanId && normalizePhone(u.mobile) === cleanId)
    );
    if (!user) return null;

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) return null;

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = UserModel;
