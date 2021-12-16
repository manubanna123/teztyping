let testService = require('../services/test.service');

async function addtest(req, res) {
    try {
        resmode = testService.saveTest(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function addtestresults(req, res) {
    try {
        resmode = testService.saveTestResults(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function gettest(req, res) {
    try {
        resmode = testService.getTest(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getFreeTest(req, res) {
    try {
        resmode = testService.getFreeTest(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getTestResults(req, res) {
    try {
        resmode = testService.getTestResults(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getTestResultsByID(req, res) {
    try {
        resmode = testService.getTestResultsByID(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getFreeTestByID(req, res) {
    try {
        resmode = testService.getFreeTestByID(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getLiveTestRankfn(req, res) {
    try {
        resmode = testService.getLiveTestRank(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}


async function saveLearningTest(req, res) {
    try {
        resmode = testService.saveLearningTest(req.body);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getLearningTest(req, res) {
    try {
        resmode = testService.getLearningTest(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getLearningTestForUser(req, res) {
    try {
        resmode = testService.getLearningTestForUsers(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getLearningTestForUserById(req, res) {
    try {
        resmode = testService.getLearningTestForUsersById(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function getLearningTestForUserByType(req, res) {
    try {
        resmode = testService.getLearningTestForUsersByType(req);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

module.exports = {
    addtest,
    gettest,
    getFreeTest,
    getFreeTestByID,
    addtestresults,
    getTestResults,
    getTestResultsByID,
    getLiveTestRankfn,
    getLearningTest,
    saveLearningTest,
    getLearningTestForUser,
    getLearningTestForUserById,
    getLearningTestForUserByType
};