import bcrypt from 'bcrypt';

export class Password {
    static toHash(password:string) {
        return bcrypt.hash(password, 10);
    }
    static compare(storedPassword:string, suppliedPassword:string):Promise<boolean> {
        return bcrypt.compare(suppliedPassword, storedPassword);
    }
}