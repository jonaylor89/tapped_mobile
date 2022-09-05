type Subscription = {
  unsubscribe: () => void;
};

export default interface AuthRepository {
  updateUser(data: any): Promise<void>;
  signUp(data: any): Promise<void>;
  signIn(data: any): Promise<void>;
  signOut(): Promise<void>;
  onAuthStateChange(
    callback: (event: string, session: any) => Promise<void>,
  ): Subscription;
  session(): any;
}
