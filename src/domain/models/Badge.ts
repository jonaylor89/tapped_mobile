class Badge {
  id!: string;
  senderId!: string;
  receiverId!: string;
  badgeUrl!: string;

  static toJSON(badge: Badge): any {
    return {
      id: badge.id,
      sender_id: badge.senderId,
      receiver_id: badge.receiverId,
      badge_url: badge.badgeUrl,
    };
  }

  static fromJSON(other: any): Badge {
    return {
      id: other.id,
      senderId: other.sender_id,
      receiverId: other.receiver_id,
      badgeUrl: other.badge_url,
    };
  }
}

export default Badge;
