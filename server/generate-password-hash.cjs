#!/usr/bin/env node

/**
 * Utility script to generate bcrypt password hash
 * Usage: node server/generate-password-hash.cjs <password>
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
    console.error('Usage: node server/generate-password-hash.cjs <password>');
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('\nGenerated password hash:');
console.log(hash);
console.log('\nAdd this to your .env file as:');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('');
