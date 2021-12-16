let articleService = require('../services/article.service');
async function getarticles(req, res) {
    try {
        resmode = articleService.getarticles();
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getfeatures(req, res) {
    try {
        resmode = articleService.getFeatureList();
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function savearticle(req, res) {
    try {
        resmode = articleService.savearticle(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getdetails(req, res) {
    try {
        resmode = articleService.getdetails(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function saveinquiry(req, res) {
    try {
        resmode = articleService.saveinquiry(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getinquiry(req, res) {
    try {
        resmode = articleService.getinquiry(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    getarticles,
    savearticle,
    getdetails,
    saveinquiry,
    getinquiry,
    getfeatures
};