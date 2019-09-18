const {User} = require('../models'),
	bcrypt = require('bcryptjs'),
	{randomString} = require('../helpers/common'),
	SpaceService = require('./SpaceService');

const UserModule = require('../modules/UserModule');

let UserService = {
	/**
	 * function check authenticate
	 * @param user
	 * @returns {Promise<*>}
	 */
	async attemp(user) {
		// check required email and password
		if (!user.email || !user.password) {
			return [{
				result: false,
				msg: 'Please enter email or password.'
			}, 401];
		}

		// find user with email
		let userInfo = await User.findOne({where: {email: user.email}, raw: true});

		// check password with bcrypt
		if (userInfo && bcrypt.compareSync(user.password, userInfo.password)) {
			// generate and update token of user
			let newToken = randomString(60);
			userInfo.accessToken = newToken;
			await User.update({accessToken: newToken}, {where: {email: user.email}});

			userInfo = UserModule.userInfo(userInfo);

			// get space list
			userInfo.spaces = await SpaceService.getList(newToken, userInfo);

			return [{
				result: true,
				msg: 'Logged in success!',
				user: userInfo
			}, 200];
		}

		return [{
			result: false,
			msg: 'Username or password is wrong.'
		}, 401];
	},

	/**
	 * function register user
	 * @param user
	 * @returns {Promise<*>}
	 */
	async register(user) {
		// check required information
		if (!user.name || !user.email || !user.password) {
			return {
				result: false,
				msg: 'Please enter name, email or password.'
			};
		}

		if (user.password.length < 6) {
			return {
				result: false,
				msg: 'Please enter password more than 6 characters.'
			};
		}

		if (user.password !== user.repassword) {
			return {
				result: false,
				msg: 'Password not match'
			};
		}

		// check email in database
		// find user with email
		const userInfo = await UserService.getUserByEmail(user.email);
		if (userInfo) {
			return {
				result: false,
				msg: 'Email has registered! Please enter another email.'
			};
		}

		// generate and update token of user
		user.accessToken = randomString(60);
		let salt = bcrypt.genSaltSync(10);
		user.password = bcrypt.hashSync(user.password, salt);
		let newUser = await User.create(user);

		newUser = UserModule.userInfo(newUser);

		// get space list
		newUser.spaces = [];

		return {
			result: true,
			msg: 'Register success!',
			user: newUser
		};
	},

	/**
	 * function get user by email
	 * @param email
	 * @returns {Promise<void>}
	 */
	async getUserByEmail(email) {
		return await User.findOne({where: {email: email}});
	}
};

module.exports = UserService;
