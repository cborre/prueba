// Invocar modo JavaScript 'strict'
'use strict';

// Crear un nuevo método controller 'render'
exports.render = function (req, res) {	
	// Usar el objeto 'response' para renderizar la view 
	res.render('index', {
		title: 'Hola Mundo',
		user: JSON.stringify(req.user)
	});
		
	/*if(req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	
	req.session.lastVisit = new Date();
	res.render('index', {
		title: 'Hola Mundo'
	});*/
};