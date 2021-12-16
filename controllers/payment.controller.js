const paymentservice = require('../services/payment.service');
async function createpayment(req, res) {
    try {
        resmode = paymentservice.createpayment(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function savepaymentdetails(req, res) {
    try {
        resmode = paymentservice.savepaymentdetails(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getsubscriptionlist(req, res) {
    try {
        resmode = paymentservice.getsubscriptionlist(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function thirdpartypayment(req, res) {
    try {
        resmode = paymentservice.savepaymentdetails(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
module.exports = {
    createpayment,
    savepaymentdetails,
    getsubscriptionlist,
    thirdpartypayment
}