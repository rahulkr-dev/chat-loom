import bcrypt from "bcryptjs";

export class CredentialService {
    private readonly saltRounds: number;
    constructor(saltRounds: number = 10) {
        this.saltRounds = saltRounds;
    }
    convertToHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
