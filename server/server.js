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
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongodb_1.default)();
        console.log('Database connected successfully');
        // Routes
        app.get('/', (req, res) => {
            res.send('Server is working');
        });
        app.use('/api/protected', protectedRoute_1.default);
        app.use('/api/product/', productRoute_1.default);
        app.use('/api/user/', userRoute_1.default);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
});
startServer();
exports.default = app;
