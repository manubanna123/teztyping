let roleService = require('../services/role.service')
async function getRoles(req, res) {
    try {
        resmode = roleService.getRole(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function addRole(req, res) {
    try {
        resmode = roleService.addRole(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}
async function getRolePermission(req, res) {
    try {
        resmode = roleService.getRolePermission(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

async function addRolePermission(req, res) {
    try {
        resmode = roleService.addRolePermission(req);
        resmode.then((role) => {
            res.json(role);
        })
            .catch(err => res.json(err));
    } catch (err) {
        res.json({ e: err })
    }
}

module.exports = {
    getRoles,
    addRole,
    getRolePermission,
    addRolePermission
};