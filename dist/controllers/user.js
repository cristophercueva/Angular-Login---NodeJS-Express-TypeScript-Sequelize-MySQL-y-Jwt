"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.NewUser = void 0;
const NewUser = (req, res) => {
    console.log(req.body);
    res.json({
        msg: 'New User',
        body: req.body
    });
};
exports.NewUser = NewUser;
const LoginUser = (req, res) => {
    console.log(req.body);
    res.json({
        msg: 'New User',
        body: req.body
    });
};
exports.LoginUser = LoginUser;
