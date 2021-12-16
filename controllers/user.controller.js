let userService = require('../services/user.service')
async function getUserList(req, res) {
    try {
        resmode = userService.getUsers(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getProfile(req, res) {
    try {
        resmode = userService.getProfile(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    getUserList,
    getProfile
};