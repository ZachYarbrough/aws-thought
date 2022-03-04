const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: 'user-images-ad430006-41e7-4347-8127-b6353490ae6b',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer
    }

    return imageParams;
}

module.exports = params;