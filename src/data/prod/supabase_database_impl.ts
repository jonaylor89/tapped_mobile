import DatabaseRepository from "../database_repository";

import { supabase } from "./supabase";
import { Badge, OnboardedUser } from "../../domain/models";

enum Tables {
  Users = "users",
  Badges = "badges",
}

export default class SupabaseDatabaseImpl implements DatabaseRepository {
  // User
  async getUserById(id: string): Promise<OnboardedUser | null> {
    try {
      console.log("SupabaseDatabaseImpl.getUserById", id);
      const { data, error, status } = await supabase
        .from(Tables.Users)
        .select(`*`)
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) {
        return null;
      }

      // TODO validate data
      return OnboardedUser.fromJSON(data);
    } catch (error) {
      // TODO add better log mechanism
      console.error(error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<OnboardedUser | null> {
    try {
      console.log("SupabaseDatabaseImpl.getUserByUsername", username);
      const { data, error, status } = await supabase
        .from(Tables.Users)
        .select(`*`)
        .match({ username })
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) {
        return null;
      }

      return OnboardedUser.fromJSON(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async upsertUser(user: OnboardedUser) {
    const dbUser = OnboardedUser.toJSON(user);

    const { error } = await supabase
      .from(Tables.Users)
      .upsert(dbUser, { returning: "minimal" });

    if (error) {
      throw error;
    }
  }

  async updateUser(user: OnboardedUser) {
    const dbUser = OnboardedUser.toJSON(user);
    const { error } = await supabase
      .from("users")
      .update(dbUser, { returning: "minimal" })
      .match({ id: user.id });

    if (error) {
      throw error;
    }
  }

  // Badge
  async getBadgesByUser(userId: string): Promise<Badge[]> {
    const { data, error } = await supabase
      .from(Tables.Badges)
      .select(`*`)
      .match({ receiver_id: userId });

    if (error) throw error;

    return data.map(Badge.fromJSON);
  }

  async insertBadge(badge: Badge) {
    const dbBadge = Badge.toJSON(badge);

    const { error } = await supabase.from("badges").insert([dbBadge]);

    if (error) {
      throw error;
    }
  }
}
