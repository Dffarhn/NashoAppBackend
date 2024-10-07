const bcrypt = require('bcrypt');

// Function to hash a given secret key using bcrypt
const hashSecretKey = async (secretKey) => {
    // Define the number of salt rounds for bcrypt
    const saltRounds = 10;

    try {
        // Hash the secret key using bcrypt
        const hashedSecretKey = await bcrypt.hash(secretKey, saltRounds);

        // Return the hashed secret key
        return hashedSecretKey;
    } catch (error) {
        console.error('Error hashing secret key:', error);
        throw error;
    }
};

// Predefined secret key
const secretKey = '@';

// Hash and log the secret key
hashSecretKey(secretKey).then(hashedSecretKey => {
    console.log('Hashed Secret Key:', hashedSecretKey);
}).catch(error => {
    console.error('Error generating hashed secret key:', error);
});
