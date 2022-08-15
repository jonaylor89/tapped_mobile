
class UserModel {
    id!: string;
    name: string | null = null;
    username: string | null = null;
    bio: string | null = null;
    website: string | null = null;
    avatarUrl: string | null = null;
    accountType: string | null = null;
    onboarded: boolean = false;

    constructor(id: string) {
        this.id = id;
    }

    static uninitializedUser = (id: string): UserModel => { return new UserModel(id) }
}

export default UserModel