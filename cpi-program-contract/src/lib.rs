use solana_program::{account_info::{next_account_info, AccountInfo},entrypoint,entrypoint::{ ProgramResult},
    pubkey::Pubkey,
instruction::{Instruction,AccountMeta},
program::{invoke}};



entrypoint!(process_instruction);


fn process_instruction(
    program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8]

) -> ProgramResult {

let mut accountiter = accounts.iter();
let data_account =next_account_info(&mut accountiter)?;
let doubleprogram_account = next_account_info(&mut accountiter)?;

let ins =Instruction{
    program_id: *doubleprogram_account.key,
    accounts: vec![AccountMeta{
        is_signer:true,
        is_writable:true,
        pubkey:*data_account.key

    }],
    data:vec![]
    
};

invoke(&ins,&[data_account.clone(),doubleprogram_account.clone()])?;
Ok(())
}