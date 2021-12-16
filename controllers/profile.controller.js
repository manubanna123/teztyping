let profileService = require('../services/profile.service');
async function getprofile(req, res) {
    try {
        resmode = profileService.getprofile(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function saveprofile(req, res) {
    try {
        resmode = profileService.saveprofile(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    getprofile,
    saveprofile
}