#!/usr/bin/env node

/**
 * Utility script to generate bcrypt password hash
 * Usage: node server/generate-password-hash.cjs
 * (You will be prompted to enter the password interactively.)
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

function promptForPassword(promptText) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true,
        });

        const prompt = String(promptText);
        const originalWrite = rl._writeToOutput;
        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            // Allow the prompt text itself, but do not echo typed characters.
            if (stringToWrite.startsWith(prompt)) {
                originalWrite.call(rl, stringToWrite);
            }
        };

        rl.question(prompt, (password) => {
            rl._writeToOutput = originalWrite;
            rl.close();
            console.log(''); // Add newline after hidden input
            resolve(password);
        });
    });
}

(async () => {
    const password = await promptForPassword('Enter password to hash: ');

    if (!password) {
        console.error('Error: Password must not be empty.');
        process.exit(1);
    }

    const hash = bcrypt.hashSync(password, 10);
    console.log('\nGenerated password hash:');
    console.log(hash);
    console.log('\nAdd this to your .env file as:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('');
})();
