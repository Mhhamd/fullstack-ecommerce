import express, { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthReqest extends Request {
    user?: any;
}

const validateToken = (
    req: AuthReqest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ valid: false, message: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        res.status(404).json({
            valid: false,
            message: 'No token secret provided',
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, tokenSecret);
        req.user = decoded;
        res.status(200).json({ valid: true, user: req.user });
        next();
    } catch (error) {
        res.status(401).json({
            valid: false,
            message: 'Invalid or expired token',
        });
    }
};

export default validateToken;
