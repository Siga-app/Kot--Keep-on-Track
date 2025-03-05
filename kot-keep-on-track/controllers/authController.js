const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).send('Usuário não encontrado');
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Credenciais inválidas');
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no login');
  }
}

module.exports = {
  register,
  login,
};
