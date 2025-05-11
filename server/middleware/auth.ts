import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: 'Access Denied' });
        return;
    }

    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        if (!tokenSecret)
            res.status(500).json({
                success: false,
                message: 'TOKEN_SECRET missing',
            });
        return;
    }

    try {
        const verified = jwt.verify(token, tokenSecret) as JwtPayload;
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
