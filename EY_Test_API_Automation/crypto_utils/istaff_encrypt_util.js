// © Copyright 2024 ISTAFFVISION CONSULTING LLP or one of its affiliates.
// This Source is ISTAFFVISION CONSULTING LLP's Copyright and no violation of Copyright is allowed

// iStaffVision Consulting LLP - Test Automation Framework 2024
// File Name : istaff_encrypt_util.js
// Author: Manu.MG
// Date  : 05/26/2024
// Version : 1.0
// Code Description: This code is generate a encrypted password.

import {Encrypter} from "./cryptoUtil.js"
import readline from "readline"
import {logger} from  "../logError/logfile.js"

/**
 * This utility is used to generate a encrypted password
*/


function generateEncryptedPassword(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('1. Enter the key name: ', (key_name) => {
  
      if (key_name==="" || key_name === undefined){
          logger.error("Key name cannot be empty")
          console.error("Key name cannot be empty")
          rl.close();
          return;
      }else if (key_name.length<3){
        logger.error("length of the key name must be greater than or equal to 3")
        console.error("length of the key name must be greater than or equal to 3")
        rl.close();
        return;
      }
    rl.question('2. Enter the password: ', (password) => {
      if (password==="" || password === undefined || !password){
          logger.error("password cannot be empty")
          console.error("password cannot be empty")
          rl.close();
          return;
      }
      const enc = new Encrypter(key_name) 
      const encrypted_password = enc.encrypt(password)
      console.log("3. Decryption key: ", key_name);
      console.log("4. Encrypted password: ", encrypted_password);
      rl.close();
    });
    
  });

  
}

generateEncryptedPassword()

