import User from "./auth-modal";
import { Iuser } from "./auth-types";

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
}

export default AuthService;
