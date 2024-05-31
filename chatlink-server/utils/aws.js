const s3 = require('../config/awsConfig');

const uploadFilesToS3 = (files, bucketName, folderPath) => {
    if (!Array.isArray(files)) {
        files = [files];
    }

    const uploadPromises = files.map(file => {
        const params = {
            Bucket: bucketName,
            Key: `${folderPath}/${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error('Error uploading file to S3:', err);
                    reject(err);
                } else {
                    console.log('File uploaded to S3 successfully:', data.Location);
                    resolve(data.Location);
                }
            });
        });
    });

    return Promise.all(uploadPromises);
};

module.exports = uploadFilesToS3;
