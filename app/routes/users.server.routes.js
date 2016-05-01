// Invocar el modo 'strict' de JavaScript
'use strict';

// Cargar las dependencias del módulo
var users = require('../controllers/users.server.controller'),
	passport = require('passport');

// Definir el método del módulo routes
module.exports = function(app) {	
	// Configurar las rutas 'signup'
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);
		
	// Configurar las routes 'signin'
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect : '/#!',
			failureRedirect: '/signin',
			failureFlash: true
		}));
	
	//Configurar las rutas Google OAuth
	app.get('/auth/google', 
		passport.authenticate('google', {
		scope: [
			'profile',
			'email'
			],
		failureredirect : '/signin'
	}));
	
	app.get('/auth/google/callback', 
		passport.authenticate('google', {
		successRedirect: '/#!',
		failureRedirect: '/signin'
	}));
	
	// Configurar la route 'signout'
	app.get('/signout', users.signout);
	
	/*// Set up the 'users' base routes
	app.route('/users')
	.post(users.create)
	.get(users.list);
	
	app.route('/users/:userId')
	.get(users.read)
	.put(users.update)
	.delete(users.delete);*/
	
	// Configurar el parámetro middleware 'userId' 
	//app.param('userId', users.userByID);	
};