
class UserModel {
    id!: string;
    email: string | null = null;
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
    onboarded = false;
    updatedAt: Date | null = null;
    createdAt: Date | null = null;

    constructor(id: string) {
        this.id = id;
    }

    static uninitializedUser = (id: string): UserModel => { return new UserModel(id) }

    static toJSON = (user: UserModel): unknown => {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            bio: user.bio,
            website: user.website,
            twitter_handle: user.twitterHandle,
            instragram_handle: user.instagramHandle,
            tiktok_handle: user.tiktokHandle,
            soundcloud_handle: user.soundcloudHandle,
            spotify_handle: user.spotifyHandle,
            avatar_url: user.avatarUrl,
            account_type: user.accountType,
            onboarded: user.onboarded,
            updated_at: user.updatedAt,
        }
    }

    static fromJSON = (other: any): UserModel => {
        return {
            id: other.id,
            email: other.email,
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
            onboarded: other.onboarded,
            updatedAt: other.updated_at,
            createdAt: other.created_at,
        }
    }
}

export default UserModel