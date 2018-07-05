const bcrypt = require('bcrypt');

module.exports = function(app, db) {
	/*
	 * METHOD: POST
	 * Route: /user
	 * Description: Method to register a user
	 * @param req request data (email, name and password)
	 * @param res result to return
	*/
	app.post('/user', (req, res) => {
		if (req.body.email && req.body.name && req.body.password) {
		    const user =  { name: req.body.name, 
		    				nameIndex: req.body.name.toLowerCase(),
							email: req.body.email,
							password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
						  };

		    db.collection('user').insert(user, (err, result) => {
				if (err) { 
					res.send({ 'error': 'Erro ao salvar o usuário' }); 
				} else {
					res.send(result.ops[0]);
				}
		    });
		} else {
			res.status(204).send(false);
		}
	});

	/*
	 * METHOD: POST
	 * Route: /user/login
	 * Description: Method to login an user by email and password
	 * @param req request data (email and password)
	 * @param res result to return
	*/
	app.post('/user/login', (req, res) => {
		if (req.body.email && req.body.password) {
			db.collection('user').find({ email: req.body.email }).toArray(
				function(err, response) {
				    if (err) 
				    	throw err;

				    bcrypt.compare(req.body.password, response[0].password, 
				    	function(err, result) {
					    	if (result) {
						  		res.send(response[0]);
							} else {
								res.status(204).send(false);
							}
						}
					);
			 	}
			);
		} else {
			res.status(204).send(false);
		}
	});

	/*
	 * METHOD: GET
	 * Route: /user
	 * Description: Method that returns all users
	 * @param req request data (nothing)
	 * @param res result to return
	*/
	app.get('/user', (req, res) => {
		db.collection('user').find({}).project({name: 1}).sort({"nameIndex": 1}).toArray(function(err, result) {
			if (err) 
				throw err;

		    res.send(result);
		});
	});
};