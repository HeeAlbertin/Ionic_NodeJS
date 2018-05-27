const bcrypt = require('bcrypt');

module.exports = function(app, db) {
	app.post('/user', (req, res) => {
		console.log(req.body);
	    const user =  { name: req.body.name, 
											email: req.body.email,
											password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
										};

	    db.collection('user').insert(user, (err, result) => {
				if (err) { 
					res.send({ 'error': 'An error has occurred' }); 
				} else {
					res.send(result.ops[0]);
				}
	    });
	});
};