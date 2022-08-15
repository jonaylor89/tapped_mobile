import { User } from "@supabase/supabase-js"
import UserModel from "../models/UserModel"

export default interface DatabaseRepository {
    getUserData(id: string): Promise<UserModel | null>;
}