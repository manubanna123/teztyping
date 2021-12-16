var express = require('express');
var router = express.Router();
let logincontroller = require('../controllers/login.controller');
let admincontroller = require('../controllers/admin.controller');
let packagecontroller = require('../controllers/package.controller');
let rolecontroller = require('../controllers/role.controller');
let articlecontroller = require('../controllers/article.controller');
let usercontroller = require('../controllers/user.controller');
let testcontroller = require('../controllers/test.controller');
let profilecontroller = require('../controllers/profile.controller');
let paymentcontroller = require('../controllers/payment.controller');
let tutorialcontroller = require('../controllers/tutorial.controller');

router.route('/auth/token').post(logincontroller.login);
router.route('/auth/newticket').post(logincontroller.newTicket);
router.route('/auth/logout').post(logincontroller.logout);
router.route('/auth/signup').post(logincontroller.signup);
router.route('/auth/setpassword').post(logincontroller.setloginpassword);
router.route('/auth/checkexpirelink').get(logincontroller.checkexpirelink);
router.route('/auth/forgotpwdsendmail').get(logincontroller.forgotpwdsendmail);
router.route('/auth/resetpassword').get(logincontroller.resetpassword);
router.route('/admin/savevideosettings').post(admincontroller.savevideosettings);
router.route('/admin/getvideosettings').get(admincontroller.getvideosettings);
router.route('/admin/getvideosettingbyid').get(admincontroller.getvideosettingbyid);
router.route('/admin/deletevideosetting').get(admincontroller.deletevideosetting);
router.route('/package/getpackage').get(packagecontroller.getpackage);

router.route('/role/getrole').get(rolecontroller.getRoles);
router.route('/role/addrole').post(rolecontroller.addRole);
router.route('/role/addrolepermission').post(rolecontroller.addRolePermission);
router.route('/role/getrolepermission').get(rolecontroller.getRolePermission);

router.route('/user/getUsers').get(usercontroller.getUserList);
router.route('/user/getprofilepermission').get(usercontroller.getProfile);
router.route('/package/savepackage').post(packagecontroller.savepackage);
router.route('/package/deletepackage').get(packagecontroller.deletepackage);
router.route('/articles/getarticles').get(articlecontroller.getarticles);
router.route('/articles/features').get(articlecontroller.getfeatures);
router.route('/articles/savearticle').post(articlecontroller.savearticle);
router.route('/home/details').get(articlecontroller.getdetails);

router.route('/test/savelearningtest').post(testcontroller.saveLearningTest);
router.route('/test/getlearningtest').get(testcontroller.getLearningTest);
router.route('/test/getlearningtestforuser').get(testcontroller.getLearningTestForUser);
router.route('/test/getlearningtestforuserbyid').get(testcontroller.getLearningTestForUserById);
router.route('/test/getlearningtestforuserbytype').get(testcontroller.getLearningTestForUserByType);
router.route('/test/savetest').post(testcontroller.addtest);
router.route('/test/savetestresults').post(testcontroller.addtestresults);
router.route('/test/gettest').get(testcontroller.gettest);
router.route('/test/getfreetest').get(testcontroller.getFreeTest);
router.route('/test/gettestresults').get(testcontroller.getTestResults);
router.route('/test/gettestresultsbyid').get(testcontroller.getTestResultsByID);
router.route('/test/getfreetestbyid').get(testcontroller.getFreeTestByID);
router.route('/test/gettestrank').get(testcontroller.getLiveTestRankfn);

router.route('/profile/getprofile').get(profilecontroller.getprofile);
router.route('/profile/updateprofile').post(profilecontroller.saveprofile);
router.route('/payment/createpayment').get(paymentcontroller.createpayment);
router.route('/payment/savepaymentdetails').post(paymentcontroller.savepaymentdetails);
router.route('/payment/getsubscriptionlist').get(paymentcontroller.getsubscriptionlist);
router.route('/auth/getdropdowns').get(logincontroller.getdropdowns);
router.route('/home/saveinquiry').post(articlecontroller.saveinquiry);
router.route('/home/getinquiry').get(articlecontroller.getinquiry);
router.route('/tutorial/gettutorial').get(tutorialcontroller.gettutorial);
router.route('/tutorial/savetutorialpdf').post(tutorialcontroller.savetutorialpdf);
router.route('/tutorial/download').get(tutorialcontroller.downloadFile);
router.route('/payment/thirdpartypayment').post(paymentcontroller.thirdpartypayment);
router.route('/user/getvideosettings').get(admincontroller.getwatchvideos);
module.exports = router;