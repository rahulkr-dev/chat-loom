import User from "./auth-modal";
import { Iuser, TpagenateQuery } from "./auth-types";

class AuthService {
    async create(user: Iuser) {
        return await User.create(user);
    }
    async getUserByEmail(email: string) {
        return await User.findOne({ email });
    }
    async getUserByUsername(username: string) {
        return await User.findOne({ username });
    }
    async getUserById(id: string) {
        return await User.findById(id, { password: 0 });
    }

    async getUsers(q: string | undefined, { page, limit }: TpagenateQuery) {
        let matchQuery = {};
        if (q) {
            const searchQueryRegexp = new RegExp(q, "i");
            matchQuery = {
                ...matchQuery,
                $or: [
                    { username: searchQueryRegexp },
                    {
                        email: searchQueryRegexp,
                    },
                    {
                        name: searchQueryRegexp,
                    },
                ],
            };
        }

        const totalUsers = await User.countDocuments();

        const users = await User.find(matchQuery, { password: 0 })
            .skip((page - 1) * limit)
            .limit(limit);

        return {
            users,
            totalUsers,
            limit,
            currentPage: page,
        };
    }
}

export default AuthService;
