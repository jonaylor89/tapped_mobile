import UserModel from "../models/UserModel"

export default interface AuthRepository {
    signUp(data: any): Promise<void>;
    signIn (data: any): Promise<void>;
    signOut(): Promise<void>;
    onAuthStateChange(
        callback: (event: string, session: any) => Promise<void>
    ): UserModel | null; 
    session(): any;
}