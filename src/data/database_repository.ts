import Badge from "../domain/models/Badge";
import { OnboardedUser } from "../domain/models"

export default interface DatabaseRepository {
    // User
    getUserById(id: string): Promise<OnboardedUser | null>;
    getUserByUsername(username: string): Promise<OnboardedUser>;
    upsertUser(user: OnboardedUser): Promise<void>;
    updateUser(user: OnboardedUser): Promise<void>;

    // Badges
    getBadgesByUser(userId: string): Promise<Badge[]>;
    insertBadge(badge: Badge): Promise<void>;
}