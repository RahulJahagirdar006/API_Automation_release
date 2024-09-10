// © Copyright 2024 ISTAFFVISION CONSULTING LLP or one of its affiliates.
// This Source is ISTAFFVISION CONSULTING LLP's Copyright and no violation of Copyright is allowed

// iStaffVision Consulting LLP - Test Automation Framework 2024
// File Name : logfile.js
// Author: Manu.MG
// Date  : 05/26/2024
// Version : 1.0
// Code Description: Logger configuration file for WebdriverIO with enhanced environment setup for detailed logging

import winston from 'winston';
import {format, createLogger, transports} from 'winston';
const {timestamp, combine, printf, colorize} = format

function buildDevLogger(){
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp}  ${level}: ${message}`;
      });
    
    return createLogger({
        level: 'debug',
        format:  combine(
            // colorize(),
            timestamp({format:'DD-MM-YY HH:mm:ss'}),
            myFormat),
        transports: [new transports.Console(),
            new transports.File({filename:'istaffvision_Test.log'})
        ]
    });
}

export const logger = buildDevLogger(); 