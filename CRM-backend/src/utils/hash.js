const Crypto = require('crypto');
require('dotenv').config()

export default function hash (string) {
    return (Crypto
        .createHmac('sha256', process.env.SECRET_KEY)
        .update(string)
        .digest('hex')
      )
}