const bcrypt = require('bcrypt-nodejs');

module.exports = {
	//user table
	createUser: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password, img } = req.body;

		//Encrypt password
		bcrypt.hash(password, null, null, function(err, hash) {
			dbi
				.create_user([ username, hash, img ])
				.then((createdUser) => {
					req.session.userid = createdUser[0].id;
					res.status(200).send(createdUser);
				})
				.catch((err) => {
					res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
					console.log(err);
				});
		});
	},
	getAllUsers: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.get_all_users()
			.then((users) => {
				res.status(200).send(users);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	}
};
