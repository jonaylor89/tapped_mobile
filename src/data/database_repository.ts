import Badge from "../domain/models/Badge";
import { UserModel } from "../domain/models"

export default interface DatabaseRepository {
    getUserById(id: string): Promise<UserModel | null>;
    getUserByUsername(username: string): Promise<UserModel>;
    upsertUser(user: UserModel): Promise<void>;
    updateUser(user: UserModel): Promise<void>;
    insertBadge(badge: Badge): Promise<void>;
}