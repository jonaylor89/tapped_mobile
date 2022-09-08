class Badge {
  id!: string;

  senderId!: string;

  receiverId!: string;

  badgeUrl!: string;

  createdAt!: Date;

  static toJSON(badge: Badge): any {
    return {
      id: badge.id,
      sender_id: badge.senderId,
      receiver_id: badge.receiverId,
      badge_url: badge.badgeUrl,
      created_at: badge.createdAt,
    };
  }

  static fromJSON(other: any): Badge {
    return {
      id: other.id,
      senderId: other.sender_id,
      receiverId: other.receiver_id,
      badgeUrl: other.badge_url,
      createdAt: other.created_at,
    };
  }
}

export default Badge;
