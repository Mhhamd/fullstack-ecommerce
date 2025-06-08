"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header('Authorization');
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(403).json({ success: false, message: 'Access Denied' });
        return;
    }
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        res.status(500).json({
            success: false,
            message: 'TOKEN_SECRET missing',
        });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, tokenSecret);
        req.user = verified;
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});
exports.authUser = authUser;
const authorizeRoles = (...allowedRules) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user || !allowedRules.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Access denied: insufficient permissions',
            });
            return;
        }
        next();
    });
};
exports.authorizeRoles = authorizeRoles;
