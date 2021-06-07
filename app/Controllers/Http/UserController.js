"use strict"

const User = use("App/Models/User");
const Database = use('Database');

class UserController {

    async store({ request, response }) {
        const data = request.only(["username", "email", "password", "avatarurl", "fullname"]);

        const user = await User.create(data)

        return user
    }

    async index({ auth, request, response, view }) {
       
        if (auth) {
        const users = await Database.from('users').where('username', request['_body']['username'])
        return users
        }
    }

    async destroy({ params, request, response }) {
        const user = await User.findOrFail(params.id);
        await user.delete();
    }

}

module.exports = UserController