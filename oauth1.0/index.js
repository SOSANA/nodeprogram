/*
 * The index.js file renders Jade templates for the corresponding pages:
 * 
*/

exports.user = require('./user');
exports.index = function(req, res, next){
    res.render('index');
};
exports.admin = function(req, res, next) {
    console.log('user info: ', req.session.user)
    res.render('protected');
}