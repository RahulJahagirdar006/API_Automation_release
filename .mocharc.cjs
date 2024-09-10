  const  envConfig = require('konfig');
  const global = new envConfig({ path: "./config" });

  const env = global.config.env;



  // async function open(){
  //   const { default: openLogo } = await import('./open.js');
  //   await openLogo();
  // };
  // open()

  module.exports = {
    // require: ['open.js'],
    spec: `./test/` + env + `/functionality_1/**/*.js`, // Define the location of your test files
    timeout: 10000,               // Set a timeout for tests (in milliseconds)
    // recursive: true,             // Look for test files in subdirectories
    // require: ['@babel/register'], // Use Babel to transpile ES6+ code
    reporter: 'mochawesome',            // Set the reporter to use for test results
    slow: 1000,                  // Specify the "slow" test threshold (in milliseconds)
    retries: 2,                  // Automatically retry failed tests up to 2 times
    ui: 'bdd',                   // Set the interface to "BDD" style (describe/it)
  };

