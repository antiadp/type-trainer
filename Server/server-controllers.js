const bcrypt = require('bcrypt-nodejs');

module.exports = {
	//users table
	createUser: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password, img } = req.body;

		//Encrypt password
		bcrypt.hash(password, null, null, function(err, hash) {
			dbi
				.create_user([ username, hash, img ])
				.then((createdUser) => {
					req.session.userid = createdUser[0].user_id;
					res.status(200).send(createdUser);
				})
				.catch((err) => {
					res.status(500).send({ errorMessage: 'This is why we cant have createUser.' });
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
				res.status(500).send({ errorMessage: 'This is why we cant have nice getAllUsers.' });
				console.log(err);
			});
	},
	getUserById: (req, res) => {
		const dbi = req.app.get('db');
		const { id: user_id } = req.params;

		dbi
			.get_user_by_id([ user_id ])
			.then((user) => {
				res.status(200).send(user);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice getUserById.' });
				console.log(err);
			});
	},
	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},

	//test_results
	getAllResults: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.get_all_results()
			.then((results) => {
				res.status(200).send(results);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice getAllResults.' });
				console.log(err);
			});
	}
};
