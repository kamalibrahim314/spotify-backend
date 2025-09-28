import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateTokens, setRefreshTokenCookie } from '../utils/generateTokens.js';
import { sanitizeTextInput } from '../utils/sanitize.js';

// ---------------- REGISTER ----------------
const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = sanitizeTextInput(name)
    email = sanitizeTextInput(email)

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // create new user
    user = new UserModel({ name, email, password });
    await user.save();

    // generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
};

// ---------------- LOGIN ----------------
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = sanitizeTextInput(email)

    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
        arabicMessage: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};

// ---------------- REFRESH ----------------
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.UserInfo._id);

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized2',
      });
    }

    const { accessToken } = generateTokens(user);
    setRefreshTokenCookie(res, refreshToken);

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden',
      arabicMessage: 'ممنوع الوصول',
      error: error.message,
    });
  }
};

// ---------------- LOGOUT ----------------
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
      return res.status(204).json({
        message: 'You are already logged out',
        arabicMessage: 'انت بالفعل تم تسجيل الخروج',
      });
    }

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    return res.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

export { register, login, refresh, logout };
