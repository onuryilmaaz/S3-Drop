import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
});

async function listAllObjects(params) {
    try {
        let files = [];

        const data = await s3.listObjectsV2(params).promise();
        files = files.concat(data.Contents.map(item => ({
            key: item.Key,
            lastModified: item.LastModified,
            size: item.Size,
        })));

        // Recursive olarak alt klasörleri listele
        if (data.CommonPrefixes && data.CommonPrefixes.length > 0) {
            for (const prefixData of data.CommonPrefixes) {
                const prefixParams = { ...params, Prefix: prefixData.Prefix };
                const nestedFiles = await listAllObjects(prefixParams);
                files = files.concat(nestedFiles);
            }
        }

        return files;
    } catch (error) {
        console.error('Error listing files:', error);
        throw error;
    }
}

export async function GET(req) {
    try {
        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Prefix: 'deneme/',
        };

        const files = await listAllObjects(params);

        return new Response(JSON.stringify(files), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const fileKey = searchParams.get('fileKey');

        if (!fileKey) {
            return new Response(JSON.stringify({ error: 'fileKey is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: fileKey,
        };

        await s3.deleteObject(params).promise();

        return new Response(JSON.stringify({ message: 'File deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


///////////////////////////


// api/list.js
// import * as AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
//     region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
// });

// async function listAllObjects(params) {
//     try {
//         let files = [];

//         const data = await s3.listObjectsV2(params).promise();
//         files = files.concat(data.Contents.map(item => ({
//             key: item.Key,
//             lastModified: item.LastModified,
//             size: item.Size,
//         })));

//         // Recursive olarak alt klasörleri listele
//         if (data.CommonPrefixes && data.CommonPrefixes.length > 0) {
//             for (const prefixData of data.CommonPrefixes) {
//                 const prefixParams = { ...params, Prefix: prefixData.Prefix };
//                 const nestedFiles = await listAllObjects(prefixParams);
//                 files = files.concat(nestedFiles);
//             }
//         }

//         return files;
//     } catch (error) {
//         console.error('Error listing files:', error);
//         throw error;
//     }
// }

// async function deleteObject(params) {
//     try {
//         await s3.deleteObject(params).promise();
//         return { success: true };
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         throw error;
//     }
// }

// export async function handler(req) {
//     const { method } = req;

//     if (method === 'GET') {
//         try {
//             const params = {
//                 Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//                 Prefix: 'deneme/',
//             };

//             const files = await listAllObjects(params);

//             return new Response(JSON.stringify(files), {
//                 status: 200,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         } catch (error) {
//             return new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }
//     } else if (method === 'DELETE') {
//         try {
//             const url = new URL(req.url);
//             const fileKey = url.searchParams.get('fileKey');

//             const params = {
//                 Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//                 Key: fileKey,
//             };

//             const result = await deleteObject(params);

//             return new Response(JSON.stringify(result), {
//                 status: 200,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         } catch (error) {
//             return new Response(JSON.stringify({ error: error.message }), {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }
//     } else {
//         return new Response('Method Not Allowed', {
//             status: 405,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }


