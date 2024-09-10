import { assert } from "chai";
import envConfig from 'konfig';
import chalk from "chalk";
import pkg from 'pactum';
import fs from 'fs';
import * as FS from "fs/promises"
import { logger } from "../logError/logfile.js";
import dotenv from "dotenv";
import xlsx from "xlsx";
import { Encrypter } from "../crypto_utils/cryptoUtil.js";

// Load environment variables from .env file
dotenv.config({ path: ".env" });


// Initialize configuration from config folder
const global = new envConfig({ path: "./config" });
const base_url = global.config.baseUrl || "";
// console.log(global.config.baseUrl);

// Set base URL for Pactum requests
const { spec, request } = pkg;
request.setBaseUrl(base_url);


class BASEPAGE{

    async requestJsonStatus(method, url, status) {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Accept': "application/json"
                })
                .expectHeaderContains('content-type', "application/json")
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

    async requestJsonStatusWithBearerToken(method, url, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json"
                })
                .expectHeaderContains('content-type', "application/json")
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    
    
    async requestJsonWithBodyStatus(method, url, json_body, status) {
        try {
            const method1 = method.toUpperCase();
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(json_body)
                .expectHeaderContains('content-type', "application/json")
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


    async requestJsonWithBodyTokenStatus(method, url, json_body, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const method1 = method.toUpperCase();
    
            const specRequest = spec()
                .withMethod(method1)
                .withPath(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(json_body)
                .expectHeaderContains('content-type', "application/json")
                .expectStatus(status);
    
            const specResponse = await specRequest;
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return specResponse;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

    //--------------------------------------------------------------------------------------------------------------------------------
    async getJsonStatus(url, status) {
        try {
            const response = await spec()
                .get(url) // Assuming it's a GET request
                .withHeaders({
                    'Accept': "application/json"
                })
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


    async getJsonStatusWithBearerToken(url, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .get(url) // Assuming it's a GET request
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json"
                })
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

//--------------------------------------------------------------------------------------------------------------------------------
    
    async postJsonAndGetStatus(url, body, status) {
        try {
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(body)
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }


    async postJsonWithBearerTokenAndGetStatus(url, body, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .post(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(body)
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

    
//--------------------------------------------------------------------------------------------------------------------------------
    async putJsonAndGetStatus(url, body, status) {
        try {
            const response = await spec()
                .put(url)
                .withHeaders({
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(body)
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

    async putJsonWithBearerTokenAndGetStatus(url, body, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            const response = await spec()
                .put(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                })
                .withJson(body)
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

//--------------------------------------------------------------------------------------------------------------------------------

    async deleteJsonWithStatus(url, status) {
        try {
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Accept': "application/json"
                })
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");

            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }

    async deleteJsonWithStatusAndToken(url, status, token) {
        try {
            if (!token) {
                throw new Error('Token is required');
            }
    
            const response = await spec()
                .delete(url)
                .withHeaders({
                    'Authorization': `Bearer ${token}`,
                    'Accept': "application/json"
                })
                .expectStatus(status)
                .expectHeaderContains('content-type', "application/json");
    
            console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
            return response;
        } catch (error) {
            logger.error(error);
            assert.fail(error);
        }
    }
    

//--------------------------------------------------------------------------------------------------------------------------------
            //assertion ExceptJson

        // async assertJsonExpect(method, url, expectedJsonBody, status = 200, content = 'expectJson', token = false, callback = async (res) => {}) {
        //     try {
        //         let response;
        //         const specRequest = spec()
        //             .withMethod(method)
        //             .withPath(url)
        //             .expectStatus(status);
                
        //         if (token) {
        //             specRequest.withBearerToken(token);
        //         }
        
        //         // Use the appropriate expectation method based on `content`
        //         if (content === 'expectJson') {
        //             specRequest.expectJson(expectedJsonBody);
        //         } else if (content === 'expectJsonLike') {
        //             specRequest.expectJsonLike(expectedJsonBody);
        //         } else if (content === 'expectJsonMatch') {
        //             specRequest.expectJsonMatch(expectedJsonBody);
        //         } else {
        //             throw new Error('Invalid content parameter. Use "expectJson", "expectJsonLike", or "expectJsonMatch".');
        //         }
        
        //         response = await specRequest;
                
        //         console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
        //         await callback(response);
        //         return response;
        //     } catch (error) {
        //         logger.error(error);
        //         assert.fail(error);
        //     }
        // }


        async assertExpectJson(method, url, expectedJsonBody, status = 200, partialMatch = true, headers = {}) {
            try {
                let method1 = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error);
                assert.fail(error);
            }
        }
        
        
        async assertExpectJsonWithToken(method, url, expectedJsonBody, status = 200, partialMatch = true, token, headers = {}) {
            try {
                if (!token) {
                    throw new Error("Authorization token is required");
                }
        
                let method1 = method.toUpperCase();
        
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    });
        
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status);
        
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error);
                assert.fail(error);
            }
        }
        
        async assertExpectJsonWithBody(
            method, url, jsonBody, expectedJsonBody, status = 200, partialMatch = true, headers = {}
        ) {
            try {
                let method1 = method.toUpperCase();
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    })
                    .withJson(jsonBody);
        
                // Add JSON expectations
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status);
        
                // Execute the request and handle the response
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error);
                assert.fail(error);
            }
        }
        
        

        async assertExpectJsonWithBodyAndToken(
            method, url, jsonBody, expectedJsonBody, status = 200, partialMatch = true, token, headers = {}
        ) {
            try {
                if (!token) {
                    throw new Error("Authorization token is required");
                }
        
                let method1 = method.toUpperCase();
                let specRequest = spec()
                    .withMethod(method1)
                    .withPath(url)
                    .withHeaders({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        ...headers
                    })
                    .withJson(jsonBody);
        
                // Add JSON expectations
                if (partialMatch) {
                    specRequest = specRequest.expectJsonLike(expectedJsonBody);
                } else {
                    specRequest = specRequest.expectJson(expectedJsonBody);
                }
        
                // Add Header and status expectation
                specRequest = specRequest.expectHeaderContains('content-type', "application/json");
                specRequest = specRequest.expectStatus(status);
        
                // Execute the request and handle the response
                const response = await specRequest;
        
                console.log(chalk.greenBright(`Status code for ${url} is ${chalk.yellowBright(status)}`));
                return response;
            } catch (error) {
                logger.error(error);
                assert.fail(error);
            }
        }

////////--------------------------------------------------------------------------------------------------------------------------------------------------------------------

    async jsonReader(path, name = "") {
        try {
            const data = await new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
            return JSON.parse(data);
        } catch (err) {
            logger.error(err);
            assert.fail(`Error occurred while reading the ${name ? name + " " : ""}json file: ${err}`);
        }
    }

///------------------------------------------------------------------------------------------------------------------------------------

    async  decryptObjectField(decrypt_key, object, keyname) {
        try {
            let obj = JSON.parse(JSON.stringify(object)); // Deep clone the object

            const decrypt = new Encrypter(decrypt_key);
            const decrypted_password = decrypt.dencrypt(obj[keyname]);

            obj[keyname] = decrypted_password;
            return obj
        } catch (error) {
            console.error(error);
        }
    }

    async decryptMultipleObjectField(decrypt_key, object, keyname) {
        try {
            // Deep clone the object (assuming the data is serializable)
            let obj = JSON.parse(JSON.stringify(object)); 
            
            // Recursive function to handle decryption
            const decryptObject = async (obj) => {
                if (typeof obj === 'object' && obj !== null) {
                    if (obj[keyname]) {
                        obj = await this.decryptObjectField(decrypt_key, obj, keyname);
                        
                    } else {
                        for (const key of Object.keys(obj)) {
                            if (typeof obj[key] === 'object' && obj[key] !== null) {
                                obj[key] = await decryptObject(obj[key]);
                            }
                        }
                    }
                }
                return obj;
            };
    
            obj = await decryptObject(obj); // Start the decryption process
            return obj; // Return the fully decrypted object
        } catch (error) {
            console.error('Decryption error:', error);
        }
    }
    


    async decryptFieldFromFile(decrypt_key, path, keyname) {
        try {
            const data = await FS.readFile(path, 'utf-8'); // Read file asynchronously
            const obj = JSON.parse(data)
    
            await decryptObjectField(decrypt_key, obj, keyname);
        } catch (error) {
            console.error("Error in decryptPath:", error);
        }
    }


//--------------------------------------------------------------------------------------------------------------------------------
        /**
     * Extracts API endpoints from a specified Excel sheet.
     *
     * @param {string} path - The file path to the Excel workbook.
     * @param {number} sheetNumber - The number of the sheet to extract data from (1-based index).
     * @param {string} apiNameColumn - The column name that contains the API names.
     * @param {string} apiEndpointUrlColumn - The column name that contains the API endpoint URLs.
     * @param {number} start_row - The starting row number for extraction (1-based index).
     * @param {number} end_row - The ending row number for extraction (1-based index).
     * @param {number[]} [skip_row] - An optional array of row numbers to skip during extraction.
     * @returns {Promise<Object>} A promise that resolves to an object mapping API names to their endpoints.
     * @throws {Error} If `start_row` is greater than `end_row`.
     * @throws {Error} If `sheetNumber` is not within the valid range.
     * @throws {Error} If `end_row` exceeds the total number of rows in the sheet.
     */
        async extractApiEndpoints(xlsx_path, sheetNumber, apiNameColumn, apiBaseUrl=null,  apiEndpointUrlColumn, start_row, end_row, skip_row = []) {
            try {
                // Validate input parameters
                const start_row_number = Number(start_row);
                const end_row_number = Number(end_row);
                if(start_row_number>end_row_number){
                    throw new Error("Start row must be less than end row")
                }
    
                // Read the Excel file
                const workbook = xlsx.readFile(xlsx_path);
    
                // Get sheet names
                const sheetNames = workbook.SheetNames;
                const sheet_number = Number(sheetNumber)
                if (sheet_number < 1 || sheet_number > sheetNames.length) {
                    throw new Error(`Invalid sheet number. Please select a sheet between 1 and ${sheetNames.length}`);
                }
        
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetNumber-1]]);
                if (jsonData.length < end_row) {
                    throw new Error("InvalidRowRangeError: The end row exceeds the total number of rows in the sheet.");
                }
                
    
                let result  = {}
        
        
                for (let i = start_row_number-1; i < end_row_number; i++){
                    if(skip_row?.includes(i+1)) continue
                    const row = jsonData[i];
                    if(apiBaseUrl){
                        if(row && row[apiNameColumn] && row[apiBaseUrl] && row[apiEndpointUrlColumn]){
                            let baseUrl = row[apiBaseUrl];
                            let endpoint = row[apiEndpointUrlColumn];
    
                            // Ensure the base URL ends with a slash
                            if (!baseUrl.endsWith("/")) {
                                baseUrl += "/";
                            }
    
                            // Ensure the endpoint does not start with a slash
                            if (endpoint.startsWith("/")) {
                                endpoint = endpoint.slice(1);
                            }
    
                            result[row[apiNameColumn]] = baseUrl + endpoint;
                        }
                    }
                    else if (row && row[apiNameColumn] && row[apiEndpointUrlColumn]) {
                        result[row[apiNameColumn]] = row[apiEndpointUrlColumn];
                    }
                }
        
                return result
            } catch (error) {
                logger.error(error)
                setTimeout(()=>{
                    assert.fail(error)
                }, 50)
            }
        }
        
}

const Base_json = new BASEPAGE()

export default Base_json





