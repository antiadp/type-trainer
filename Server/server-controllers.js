const bcrypt = require('bcrypt-nodejs');

module.exports = {
	//users table
	createUser: (req, res) => {
		const dbi = req.app.get('db');
		const { username, password, img } = req.body;
		//see if username exists
		dbi.find_user([ username ]).then((userExists) => {
			if (userExists[0]) {
				req.session.user = userExists[0];
				res.status(200).send(req.session.user);
			} else {
				//create new user
				//Encrypt password
				bcrypt.hash(password, null, null, function(err, hash) {
					dbi
						.create_user([ username, hash, img ])
						.then((createdUser) => {
							req.session.user = createdUser[0];
							res.status(200).send(req.session.user);
						})
						.catch((err) => {
							res.status(500).send({ errorMessage: 'This is why we cant have createUser.' });
							console.log(err);
						});
				});
			}
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
		res.redirect('/');
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
	},

	//snippets
	getSnippet: (req, res) => {
		let {id} = req.params;
		req.app
			.get('db')
			.get_snippet(id)
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice getSnippet.' });
				console.log(err);
			});
	}
};
