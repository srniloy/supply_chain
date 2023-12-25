import crypto from "crypto";


function decryptData(encryptedData, key, iv) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return JSON.parse(decrypted);
}


function calculateMD5(data) {
    const hash = crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
    return hash;
}





const Decrypt = (transmissionData, hexKey) => {
    const receivedEncryptedData = transmissionData.encryptedData;
    const receivedMD5Hash = transmissionData.md5Hash;
    const receivedIV = transmissionData.iv;
    const aesKey = Buffer.from(hexKey, "hex")


    const decryptedData = decryptData(receivedEncryptedData, aesKey, receivedIV);

    const decryptedMD5Hash = calculateMD5(decryptedData);

    const response = {
        status: '',
        msg: '',
        data: {}
    }

    if (decryptedMD5Hash === receivedMD5Hash) {
        response.status = 'success'
        response.msg = "Data integrity verified. Decrypted data:"
        response.data = decryptedData
    } else {
        response.status = 'failed'
        response.msg = "Data integrity check failed. Do not trust the decrypted data."
    }
    return response;
}

export default Decrypt