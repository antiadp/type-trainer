const bcrypt = require('bcrypt-nodejs');

module.exports = {
	// //user table
	// createUser: (req, res) => {
	// 	const dbi = req.app.get('db');
	// 	const { username, password, img } = req.body;

	// 	//Encrypt password
	// 	bcrypt.hash(password, null, null, function(err, hash) {
	// 		dbi
	// 			.create_user([ username, hash, img ])
	// 			.then((createdUser) => {
	// 				req.session.userid = createdUser[0].id;
	// 			})
	// 			.catch((err) => {
	// 				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
	// 				console.log(err);
	// 			});
	// 	});
	// }

	getSnippet: function(req, res){
		req.app.get('db').get_snippet().then(res => {
			console.log('here is the snippet', res)
		})
	}
};
