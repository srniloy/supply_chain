import crypto from 'crypto'



function encryptData(data, key) {
    if (!key || !data) {
        console.error("Key or data is empty or undefined.");
        process.exit(1);
    }

    const iv = crypto.randomBytes(16); // Initialization Vector
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
    encrypted += cipher.final("hex");
    return { encryptedData: encrypted, iv: iv.toString("hex") };
}

function calculateMD5(data) {
    const hash = crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
    return hash;
}



const Encryption = (jsonData, hexKey) => {
    const key = Buffer.from(hexKey, "hex")


    const { encryptedData, iv } = encryptData(jsonData, key)

    const md5Hash = calculateMD5(jsonData);

    const transmissionData = {
        encryptedData: encryptedData,
        md5Hash: md5Hash,
        iv: iv,
    };


    return transmissionData
}

export default Encryption