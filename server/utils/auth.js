const bcrypt = require('bcrypt');

export const hashPassword = async (password) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 8, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        });
      })
    
      return hashedPassword
    }


export const comparePasswords = (password, hashed) => {
    bcrypt.compare(password, hashed);
}