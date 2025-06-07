"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const protectedRoute_1 = __importDefault(require("./routes/protectedRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'https://mercadoxfrontend.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
    ],
}));
(0, mongodb_1.default)();
// Routes
app.get('/', (req, res) => {
    res.send('Server is working');
});
app.use('/api/protected', protectedRoute_1.default);
app.use('/api/product/', productRoute_1.default);
app.use('/api/user/', userRoute_1.default);
exports.default = app;
