"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var core_1 = require("../../core");
var jsonwebtoken_1 = require("jsonwebtoken");
var logger_1 = require("../../config/logger");
var user_model_1 = require("../models/user.model");
var AuthController = (function () {
    function AuthController(config, logProvider) {
        this.config = config;
        this.logger = logProvider.factory(logger_1.stdoutLogger);
    }
    AuthController.prototype.initialize = function (options) {
        var opts = {
            jwtFromRequest: this.extractJwt,
            secretOrKey: this.config.secretKey
        };
        passport.use('jwt', new passport_jwt_1.Strategy(opts, function (payload, done) {
            done(undefined, payload);
        }));
        return passport.initialize();
    };
    AuthController.prototype.extractJwt = function (req) {
        var jwt = passport_jwt_1.ExtractJwt.fromAuthHeader()(req);
        return jwt;
    };
    AuthController.prototype.authenticate = function () {
        return passport.authenticate('jwt', { session: false });
    };
    AuthController.prototype.authorize = function (req, res, next) {
        var _this = this;
        var credentials;
        try {
            credentials = this.getCredentials(req);
        }
        catch (ex) {
            if (ex.message === 'Credentials Required') {
                res.header('WWW-Authenticate', 'Basic');
                res.send(401, 'Unauthorized');
                return;
            }
            else {
                res.send(401, 'Unauthorized');
            }
        }
        var UserModel = user_model_1.UserModelFactory();
        var userSearchCondition = credentials.provider === 'Facebook' ?
            { email: credentials.username } :
            { email: credentials.username, password: credentials.password };
        UserModel.findOne({
            where: userSearchCondition
        }).then(function (user) {
            if (!user) {
                _this.logger.error('User not found in db');
                if (credentials.provider === 'Facebook') {
                    _this.createUser(credentials)
                        .then(function (newUser) {
                        var token = _this.signToken(newUser);
                        res.send(200, { token: token });
                        next();
                    });
                }
                else {
                    res.send(401, 'Unauthorized');
                    next();
                }
            }
            else {
                var token = _this.signToken(user);
                res.send(200, { email: user.email, token: token });
                next();
            }
        });
    };
    AuthController.prototype.signup = function (req, res, next) {
        var _this = this;
        var credentials;
        try {
            credentials = this.getCredentials(req);
            this.logger.info('Create new user', credentials);
        }
        catch (ex) {
            if (ex.message === 'Credentials Required') {
                res.header('WWW-Authenticate', 'Basic');
                res.send(401, 'Unauthorized');
                return;
            }
            else {
                res.send(401, 'Unauthorized');
            }
        }
        var UserModel = user_model_1.UserModelFactory();
        var userSearchCondition = credentials.provider === 'Facebook' ?
            { email: credentials.username } :
            { email: credentials.username, password: credentials.password };
        UserModel.findOne({
            where: userSearchCondition
        }).then(function (user) {
            if (!user) {
                var newUser = _this.createUser(credentials);
                res.send(200);
                next();
            }
            else {
                res.send(200, { status: 'ERROR', message: 'Duplicate user' });
            }
        }).catch(function (err) { return console.log(err); });
    };
    AuthController.prototype.getCredentials = function (req) {
        var provider = req.headers['x-login-provider'];
        if (provider === undefined) {
            throw new Error('Invalid request. Login provider is required.');
        }
        var auth = req.authorization.basic;
        if (!auth) {
            throw new Error('Credentials Required');
        }
        var username = auth.username, password = auth.password;
        this.logger.info({ user: auth });
        return { username: username, password: password, provider: provider };
    };
    AuthController.prototype.createUser = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var UserModel, newUser, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        UserModel = user_model_1.UserModelFactory();
                        return [4 /*yield*/, UserModel.create({
                                email: credentials.username,
                                password: credentials.password
                            })];
                    case 1:
                        newUser = _a.sent();
                        token = this.signToken(newUser);
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    AuthController.prototype.signToken = function (user) {
        var signOptions = {};
        var token = jsonwebtoken_1.sign({ user: user.id }, this.config.secretKey, signOptions);
        return token;
    };
    return AuthController;
}());
AuthController = __decorate([
    core_1.Decorators.autobind,
    __param(0, core_1.IOC.Inject),
    __param(1, core_1.IOC.Inject),
    __metadata("design:paramtypes", [core_1.Types.ServerConfig, core_1.LogProvider])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controller.js.map