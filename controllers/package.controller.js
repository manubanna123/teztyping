let packageService = require('../services/package.service')
async function getpackage(req, res) {
    try {
        resmode = packageService.getpackage(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function savepackage(req, res) {
    try {
        resmode = packageService.savepackage(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function deletepackage(req, res) {
    try {
        resmode = packageService.deletepackage(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    getpackage,
    savepackage,
    deletepackage
};