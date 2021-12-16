let adminService = require('../services/admin.service')
async function savevideosettings(req, res) {
    try {
        resmode = adminService.savevideosettings(req.body);
        resmode.then((videoupload) => {
            res.json(videoupload);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getvideosettings(req, res) {
    try {
        resmode = adminService.getvideosettings(req.query);
        resmode.then((videoupload) => {
            res.json(videoupload);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getvideosettingbyid(req, res) {
    try {
        resmode = adminService.getvideosettingbyid(req);
        resmode.then((videoupload) => {
            res.json(videoupload);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function deletevideosetting(req, res) {
    try {
        resmode = adminService.deletevideosetting(req.query);
        resmode.then((videoupload) => {
            res.json(videoupload);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getwatchvideos(req, res) {
    try {
        resmode = adminService.getwatchvideos(req.query);
        resmode.then((videoupload) => {
            res.json(videoupload);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    savevideosettings,
    getvideosettings,
    getvideosettingbyid,
    deletevideosetting,
    getwatchvideos
};