
let loginService = require('../services/login.service')
async function login(req, res) {
    try {
        resmode = loginService.getLogin(req.body);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function newTicket(req, res) {
    try {
        resmode = loginService.newTicketFn(req.body);
        resmode.then((token) => {
            res.json(token)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function logout(req, res) {
    try {
        resmode = loginService.logoutfn(req.body);
        resmode.then((token) => {
            res.json(token)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function signup(req, res) {
    try {
        resmode = loginService.signup(req);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function setloginpassword(req, res) {
    try {
        resmode = loginService.setloginpassword(req.body);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function checkexpirelink(req, res) {
    try {
        resmode = loginService.checkexpirelink(req.query);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function forgotpwdsendmail(req, res) {
    try {
        resmode = loginService.forgotpwdsendmail(req);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function resetpassword(req, res) {
    try {
        resmode = loginService.resetpassword(req.query);
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getdropdowns(req, res) {
    try {
        resmode = loginService.getdropdowns();
        resmode.then((user) => {
            res.json(user)
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    login,
    newTicket,
    signup,
    setloginpassword,
    checkexpirelink,
    forgotpwdsendmail,
    resetpassword,
    logout,
    getdropdowns
};