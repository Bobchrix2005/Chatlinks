
const s3 = require('../config/awsConfig');


const uploadFileToS3 = (fileBuffer, filename, bucketName, folderPath) => {
    
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: `${folderPath}/${Date.now()}_${filename}`,
            Body: fileBuffer,
            ContentType: 'application/octet-stream',
            ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                reject(err);
            } else {
                console.log('File uploaded to S3 successfully:', data.Location);
                const fileUrl = data.Location;
                resolve(fileUrl);
            }
        });
    });
};

module.exports = uploadFileToS3;
