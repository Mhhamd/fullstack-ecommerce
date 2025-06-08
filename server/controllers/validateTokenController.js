"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        req.user = decoded;
        res.status(200).json({ valid: true, user: req.user });
        next();
    }
    catch (error) {
        res.status(401).json({
            valid: false,
            message: 'Invalid or expired token',
        });
    }
};
exports.default = validateToken;
