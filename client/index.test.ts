import * as path from "path";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";
import { LiteSVM } from "litesvm";
import { expect, test, describe, beforeEach } from "bun:test";
import { deserialize } from "borsh";
import * as borsh from "borsh";
import { buffer } from "stream/consumers";

test("one transfer", () => {
	  const programPath = path.join(import.meta.dir, "../double-contract/target/deploy/double_contract.so");
	const svm = new LiteSVM();
	const contractpubkey = PublicKey.unique();
	svm.addProgramFromFile(contractpubkey,programPath)
	const payer = new Keypair();
	svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
	const dataAccount = new Keypair();
	const blockhash = svm.latestBlockhash();
	const ixs = [
		SystemProgram.createAccount({
			fromPubkey: payer.publicKey,
			newAccountPubkey:dataAccount.publicKey ,
			lamports:Number(svm.minimumBalanceForRentExemption(BigInt(4))),
			space:4,
			programId:contractpubkey
		}),
	];
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
	tx.feePayer=payer.publicKey
	tx.add(...ixs);
	tx.sign(payer,dataAccount);
	svm.sendTransaction(tx);
	const balanceAfter = svm.getBalance(dataAccount.publicKey);
	const txi = new Transaction();
const ins = new TransactionInstruction({
	programId:contractpubkey,
	keys:[
		{pubkey:dataAccount.publicKey,isSigner:true,isWritable:true}
	],
	data: Buffer.from([])
})
txi.recentBlockhash = svm.latestBlockhash();
txi.add(ins)
txi.sign(payer,dataAccount)
svm.sendTransaction(txi)
svm.expireBlockhash()

const counter = svm.getAccount(dataAccount.publicKey)
if (!counter) {
  throw new Error("Account not found or has no data");
}
console.log(counter.data)


	expect(counter.data[0]).toBe(1)
	expect(counter.data[1]).toBe(0)
	expect(counter.data[2]).toBe(0)
	expect(counter.data[3]).toBe(0)
	function double() {
		const tx2 =  new Transaction()
const inx = new TransactionInstruction({
	programId:contractpubkey,
	keys:[
		{pubkey:dataAccount.publicKey,isSigner:true,isWritable:true}
	],
	data: Buffer.from([])
})
tx2.recentBlockhash = svm.latestBlockhash();
tx2.add(ins)
tx2.sign(payer,dataAccount)
svm.sendTransaction(tx2)
svm.expireBlockhash()
	}
double()
double()
double()


const counter1 = svm.getAccount(dataAccount.publicKey)
if (!counter1) {
	throw new Error("Account not found or has no data");

}
console.log(counter1?.data)
	expect(counter1.data[0]).toBe(8)
	expect(counter1.data[1]).toBe(0)
	expect(counter1.data[2]).toBe(0)
	expect(counter1.data[3]).toBe(0)
});

