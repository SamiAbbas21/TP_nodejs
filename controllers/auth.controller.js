const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let requester;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        requester = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        // ignore invalid token
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };
    if (role && requester && requester.role === 'admin') {
      userData.role = role;
    }
    const user = await User.create(userData);
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ userId: user._id, role: user.role, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
