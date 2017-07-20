import { IOC, Types } from '../core';

let loginController: Types.AuthGuard = IOC.Container.get(Types.AuthGuard);

export let login: Types.HttpRoute = {
    method: 'POST',
    path: '/login',
    name: 'login',
    handler: loginController.authorize,
    protected: false
};

export let signup: Types.HttpRoute = {
    method: 'POST',
    path: '/signup',
    name: 'signup',
    handler: loginController.signup,
    protected: false
};

export let profile: Types.HttpRoute = {
    method: 'GET',
    path: '/profile',
    name: 'UserProfile',
    handler: function (req, res, next) { res.send('Hello world!'); },
    protected: true
};