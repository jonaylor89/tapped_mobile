import {clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
    Account,
    getMint,
    getAccount
} from '@solana/spl-token';
import React from 'react';

window.Buffer = window.Buffer || require("buffer").Buffer;

function mintToken() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate(); // TODO change to our wallet
    let mint: PublicKey;
    let fromTokenAccount: Account;
    const toWallet = new PublicKey("INSERT YOUR PUBLIC KEY HERE")

    async function createToken() {
        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);

        mint = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            9 // 9 here means we have a decimal of 9 0's
        );
        console.log(`Create Token: ${mint.toBase58()}`);

        // get token acct
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );
        console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);
    }

    async function mintToken() {
        const signature = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet.publicKey,
            10000000000 // 10 billion
        );
    }
    console.log(`Mint signature: $(signature)`);

    async function checkBalance() {
        const mintInfo = await getMint(connection, mint);
        console.log(mintInfo.supply);

        const tokenAccountInfo = await getAccount(connection, fromTokenAccount.address);
        console.log(tokenAccountInfo.amount);
    }

    async function sendToken() {
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);
        console.log(`toTokenAccount ${toTokenAccount.address}`);

        const signature = await transfer(
            connection,
            fromWallet,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            1000000000 // 1 billion
        );
        console.log(`finished transfer with ${signature}`);
    }


    return (
        <div>
            <button onClick={createToken}>Create Token</button>
            <button onClick={mintToken}>Mint Token</button>
            <button onClick={checkBalance}>Check Balance</button>
            <button onClick={sendToken}>Send Token</button>
        </div>
    );
}

export default mintToken;