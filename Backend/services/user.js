const { User} = require("../models");

class UserService {
    constructor() {
    }

    /**
     * Get user details by email
     * @param email
     * @returns {Promise<Model|null>}
     */
    static getUserByEmail = async (email) => {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    };

    /**
     * Add new user
     * @param payload
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static addUser = async (payload) => {
        return await User.create(payload)
    }

    static getUserById = async (id) => {
        return await User.findOne({
            where: {
                id: id,
            },
        });
    }
}

module.exports = UserService;
