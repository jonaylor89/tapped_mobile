class OnboardedUser {
    id!: string;
    name: string | null = null;
    username: string | null = null;
    bio: string | null = null;
    website: string | null = null;
    twitterHandle: string | null = null;
    instagramHandle: string | null = null;
    tiktokHandle: string | null = null;
    soundcloudHandle: string | null = null;
    spotifyHandle: string | null = null;
    avatarUrl: string | null = null;
    accountType: string | null = null;
    updatedAt: Date | null = null;
    createdAt: Date | null = null;

    constructor(id: string) {
        this.id = id;
    }

    static uninitializedUser = (id: string): OnboardedUser => {
        return new OnboardedUser(id);
    };

    static toJSON = (user: OnboardedUser): any => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            bio: user.bio,
            website: user.website,
            twitter_handle: user.twitterHandle,
            instagram_handle: user.instagramHandle,
            tiktok_handle: user.tiktokHandle,
            soundcloud_handle: user.soundcloudHandle,
            spotify_handle: user.spotifyHandle,
            avatar_url: user.avatarUrl,
            account_type: user.accountType,
            updated_at: user.updatedAt,
        };
    };

    static fromJSON = (other: any): OnboardedUser => {
        return {
            id: other.id,
            name: other.name,
            username: other.username,
            bio: other.bio,
            website: other.website,
            twitterHandle: other.twitter_handle,
            instagramHandle: other.instragram_handle,
            tiktokHandle: other.tiktok_handle,
            soundcloudHandle: other.soundcloud_handle,
            spotifyHandle: other.spotify_handle,
            avatarUrl: other.avatar_url,
            accountType: other.account_type,
            updatedAt: other.updated_at,
            createdAt: other.created_at,
        };
    };
}

export default OnboardedUser;
