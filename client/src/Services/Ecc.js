import EC from 'elliptic'
import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8';

// Initializing the curve instance.
export const ec = new EC.ec(process.env.REACT_APP_CURVE_KEY)

//Method to encrypt message
export const encryptMessage = (message, recipientPublicKey) => {
    // Ephemeral key is generated
    const ephemeralKeyPair = ec.genKeyPair()

    // Shared key is generated
    const sharedKey = ephemeralKeyPair.derive(ec.keyFromPublic(recipientPublicKey, 'hex').getPublic())

    // Shared key Hex for encryption is generated
    const sharedKeyHex = sharedKey.toString(16)

    const encryptedMessage = AES.encrypt(message, sharedKeyHex).toString()

    return {
        encryptedMessage,
        ephemeralPublicKey: ephemeralKeyPair.getPublic('hex')
    }
}

export const decryptMessage = (encryptedMessage, ephemeralPublicKey, privateKey) => {
    // Ephemeral key pair is generated
    const recipientKeyPair = ec.keyFromPrivate(privateKey, 'hex')

    // Shared key is generated
    const sharedKey = recipientKeyPair.derive(ec.keyFromPublic(ephemeralPublicKey, 'hex').getPublic())

    // Shared key hex is then generated as well
    const sharedKeyHex = sharedKey.toString(16)

    const decryptedMessage = AES.decrypt(encryptedMessage, sharedKeyHex).toString(Utf8)
    
    return decryptedMessage
}