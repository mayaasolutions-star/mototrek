const UserModel = require('../models/user.model');

async function signup(req, res) {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ success: false, error: { message: 'All fields are required' } });
    }
    const user = await UserModel.createUser({ name, email, mobile, password });
    return res.status(201).json({
      success: true,
      data: { user, token: `mtt_token_${user.id}` },
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ success: false, error: { message: 'Credentials required' } });
    }
    const user = await UserModel.findByCredentials(identifier, password);
    if (!user) {
      return res.status(401).json({ success: false, error: { message: 'Invalid email/mobile or password' } });
    }
    return res.status(200).json({
      success: true,
      data: { user, token: `mtt_token_${user.id}` },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: err.message } });
  }
}

module.exports = { signup, login };
