import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, Text, Linking, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import type { ApiError, Session } from "@supabase/supabase-js";
import React from "react";

// import {clusterApiUrl,
//   Connection,
//   PublicKey,
//   Keypair,
//   LAMPORTS_PER_SOL
// } from '@solana/web3.js';

// import {
//   createMint,
//   getOrCreateAssociatedTokenAccount,
//   mintTo,
//   transfer,
//   Account as TokenAccount,
//   getMint,
//   getAccount
// } from '@solana/spl-token';

window.Buffer = window.Buffer || require("buffer").Buffer;
import Avatar from "./Avatar";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [account_type, setAccountType] = useState("");

  const [onboarded, setOnboarded] = useState(false);
  const [createBadgeForm, setCreateBadgeForm] = useState(false);

  const [badgeReceiver, setBadgeReceiver] = useState("");

  // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  // const fromWallet = Keypair.generate(); // TODO change to our wallet
  // let mint: PublicKey;
  // let fromTokenAccount: TokenAccount;
  // const toWallet = new PublicKey("5zS6TsDGN87XqJe6ALCkz6UhStpV4nFQirgDxNJWWJYx");


  useEffect(() => {
    if (session) getUser();
  }, [session]);

  async function getUser() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("users")
        .select(`name, username, bio, website, avatar_url, account_type`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setOnboarded(true);
        setName(data.name)
        setUsername(data.username);
        setBio(data.bio);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setAccountType(data.account_type);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    name,
    username,
    website,
    avatar_url,
    account_type,
  }: {
    name: string,
    username: string;
    website: string;
    avatar_url: string;
    account_type: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        name,
        website,
        avatar_url,
        account_type,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("users")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }

      setOnboarded(true)
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }
  
  const OnboardForm = () => {
    return (
      <View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={session?.user?.email} disabled />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Name"
            value={name || ""}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Username"
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Bio"
            value={bio || ""}
            onChangeText={(text) => setBio(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Website"
            value={website || ""}
            onChangeText={(text) => setWebsite(text)}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Account Type"
            value={account_type || ""}
            onChangeText={(text) => setAccountType(text)}
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? "Loading ..." : "Update"}
            onPress={() => updateProfile({ name, username, website, avatar_url, account_type })}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
      </View>
    );
  }

  const SendBadgeForm = () => {
    return (
      <View>
        <h1>Send Badge Form</h1>
        <View style={styles.verticallySpaced}>

          // TODO: Add input to upload the badge image

          <Input
            label="Recipient username"
            value={badgeReceiver || ""}
            onChangeText={(text) => setBadgeReceiver(text)}
          />
        </View>
        <Button title='Confirm' onPress={() => setCreateBadgeForm(false)} />
      </View>
    );
  }

// TODO actually mint MFTs client side
//   async function createToken() {
//     const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
//     await connection.confirmTransaction(fromAirdropSignature);

//     mint = await createMint(
//         connection,
//         fromWallet,
//         fromWallet.publicKey,
//         null,
//         9 // 9 here means we have a decimal of 9 0's

//     );
//     console.log(`Create Token: ${mint.toBase58()}`);

//     // get token acct
//     fromTokenAccount = await getOrCreateAssociatedTokenAccount(
//         connection,
//         fromWallet,
//         mint,
//         fromWallet.publicKey
//     );
//     console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);
// }

// async function mintToken() {
//     const signature = await mintTo(
//         connection,
//         fromWallet,
//         mint,
//         fromTokenAccount.address,
//         fromWallet.publicKey,
//         10_000_000_000 // 10 billion
//     );

//     console.log(`Mint signature: ${signature}`);
// }

// async function checkBalance() {
//     const mintInfo = await getMint(connection, mint);
//     console.log(mintInfo.supply);

//     const tokenAccountInfo = await getAccount(connection, fromTokenAccount.address);
//     console.log(tokenAccountInfo.amount);
// }

// async function sendToken() {
//     const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);
//     console.log(`toTokenAccount ${toTokenAccount.address}`);

//     const signature = await transfer(
//         connection,
//         fromWallet,
//         fromTokenAccount.address,
//         toTokenAccount.address,
//         fromWallet.publicKey,
//         1_000_000_000 // 1 billion
//     );
//     console.log(`finished transfer with ${signature}`);
// }

  const Profile = () => {
    return (
      <View>
        <Avatar url={avatar_url} size={4096} onUpload={(imageUrl: string) => { setAvatarUrl(imageUrl) }} />
        <h1>{username}</h1>
        <Button >Create Token</Button>
        {/* <Button onPress={mintToken}>Mint Token</Button>
        <Button onPress={checkBalance}>Check Balance</Button>
        <Button onPress={sendToken}>Send Token</Button> */}
        <Text>Name: {name}</Text>
        <Text>Bio: {bio}</Text>
        <Text>Website: </Text>
        <TouchableOpacity onPress={() => Linking.openURL(website)}>
          <Text style={{ color: 'blue' }}>{website}</Text>
        </TouchableOpacity>
        <Text>Avatar URL: {avatar_url}</Text>
        {(account_type === 'business') ? <Button title='Create a new badge' onPress={() => setCreateBadgeForm(true)} /> : null}
      </View>
    );
  }

  return (
    <View>
      {
        (onboarded)
          ? <View style={styles.container}>
            {
              (createBadgeForm)
                ? <View>
                  <h1>Send Badge Form</h1>
                  <View style={styles.verticallySpaced}>

                    {/* TODO: Add input to upload the badge image */}

                    <Input
                      label="Recipient username"
                      value={badgeReceiver || ""}
                      onChangeText={(text) => setBadgeReceiver(text)}
                    />
                  </View>
                  <Button title='Confirm' onPress={() => setCreateBadgeForm(false)} />
                </View>
                : <Profile />
            }
          </View>
          : <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Name"
                value={name || ""}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Username"
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Bio"
                value={bio || ""}
                onChangeText={(text) => setBio(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Website"
                value={website || ""}
                onChangeText={(text) => setWebsite(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Account Type"
                value={account_type || ""}
                onChangeText={(text) => setAccountType(text)}
              />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Button
                title={loading ? "Loading ..." : "Complete Sign Up"}
                onPress={() => updateProfile({ name, username, website, avatar_url, account_type })}
                disabled={loading}
              />
            </View>

            <View style={styles.verticallySpaced}>
              <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});