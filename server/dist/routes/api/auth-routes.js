import { Router } from 'express';
import { User } from '../../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({
        where: { username: username.trim() },
    });
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed!' });
    }
    const passwordIsValid = await bcrypt.compare(password.trim(), user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
