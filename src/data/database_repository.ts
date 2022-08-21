import Badge from "../domain/models/Badge";
import { UserModel } from "../domain/models"

export default interface DatabaseRepository {
    // User
    getUserById(id: string): Promise<UserModel | null>;
    getUserByUsername(username: string): Promise<UserModel>;
    upsertUser(user: UserModel): Promise<void>;
    updateUser(user: UserModel): Promise<void>;

    // Badges
    getBadgesByUser(userId: string): Promise<Badge[]>;
    insertBadge(badge: Badge): Promise<void>;
}