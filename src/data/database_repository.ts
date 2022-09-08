import Badge from '../domain/models/Badge';
import { OnboardedUser } from '../domain/models';

export default interface DatabaseRepository {
  // User
  getUserById(id: string): Promise<OnboardedUser | null>;
  getUserByUsername(username: string): Promise<OnboardedUser | null>;
  upsertUser(user: OnboardedUser): Promise<void>;
  updateUser(user: OnboardedUser): Promise<void>;

  // Badges
  getBadgesByUser(userId: string): Promise<Badge[]>;
  insertBadge(badge: Badge): Promise<void>;

  // search
  searchUser(username: string): Promise<OnboardedUser[] | null>; // TODO: what is the promise waiting for? the username?
  // searchBadge(badge: Badge): Promise<void>; // TODO: should this also be void? not needed for now, client-side filter for alpha
}
