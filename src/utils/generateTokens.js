//✅
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


const generateTokens = (user) => {
    const uniqueId = uuidv4();

    const accessToken = jwt.sign(
        { UserInfo: { _id: user._id, name: user.name, role: user.role, jti: uniqueId } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { UserInfo: { _id: user._id, jti: uuidv4() } },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '30d' }
    );
    return { accessToken, refreshToken };
};

const setRefreshTokenCookie = (res, token) => {
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export { generateTokens, setRefreshTokenCookie };
