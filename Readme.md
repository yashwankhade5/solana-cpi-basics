# Solana CPI Basics

This repository demonstrates **Cross Program Invocation (CPI)** in Solana using two simple Rust programs and their clients with tests.  
It uses [LiteSVM](https://github.com/anza-xyz/litesvm) for local testing, so you don’t need to run a Solana validator or deploy to devnet for the included tests.


## 📂 Project Structure

```text
.
├── double-contract/          # Simple program (doubles a counter value)
├── cpi-program-contract/     # Program that makes a CPI call to double-contract
├── client/                   # Client + tests for double-contract
├── client-cpi/               # Client + tests for cpi-program-contract

```

## 🚀 Setup & Usage

### 1. Build the programs
Each program must be compiled separately to generate its `.so` file.

#### Double Contract
```bash
cd double-contract
cargo build-sbf --release
```

This will produce target/deploy/double_contract.so.

CPI Program Contract

⚠️ Make sure you’ve already built the double-contract first, since CPI tests depend on it.
```bash
cd cpi-program-contract
cargo build-sbf --release
```
This will produce target/deploy/cpi_program_contract.so.

### 2. Run tests

Both clients use Bun
 and LiteSVM.

Double Contract tests

```bash
cd double-contract/client
bun install
bun test
```
CPI Contract tests

Make sure the .so files for both double-contract and cpi-program-contract are built first.
```bash
cd cpi-program-contract/client
bun install
bun test
```
