let tutorialService = require('../services/tutorial.service')
async function gettutorial(req, res) {
    try {
        resmode = tutorialService.gettutorial(req.query);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function savetutorialpdf(req, res) {
    try {
        resmode = tutorialService.savetutorialpdf(req, res);
        resmode.then((pdetails) => {
            res.json(pdetails);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function downloadFile(req, res) {
    try {
        res.download(__dirname + "/../" + req.query.filename); // Set disposition and send it.
    } catch (err) {
        res.json({ e: err })
    }
}
// async function deletetutorial(req, res) {
//     try {
//         resmode = tutorialService.deletetutorial(req.query);
//         resmode.then((pdetails) => {
//             res.json(pdetails);
//         })
//             .catch(err => res.json(err));
//     } catch (err) {
//         res.json({ e: err })
//     }
// }
module.exports = {
    gettutorial,
    savetutorialpdf,
    downloadFile
    // deletetutorial
};