// import { S3 } from 'aws-sdk';

// const s3 = new S3({
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
//     region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
// });

// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const username = searchParams.get('username');

//         if (!username) {
//             return new Response(JSON.stringify([]), {
//                 status: 200,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }

//         const params = {
//             Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//             Prefix: `deneme/${username}/`, // Kullanıcı adına göre dosyaların ön eki
//         };

//         const data = await s3.listObjectsV2(params).promise();
//         const files = data.Contents.map(item => ({
//             key: item.Key,
//             lastModified: item.LastModified,
//             size: item.Size,
//         }));

//         return new Response(JSON.stringify(files), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error listing files:', error);
//         return new Response(JSON.stringify([]), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }

// export async function DELETE(req) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const fileKey = searchParams.get('fileKey');

//         if (!fileKey) {
//             return new Response(JSON.stringify({ error: 'fileKey is required' }), {
//                 status: 400,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }

//         const params = {
//             Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
//             Key: fileKey,
//         };

//         await s3.deleteObject(params).promise();

//         return new Response(JSON.stringify({ message: 'File deleted successfully' }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error deleting file:', error);
//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }


import { S3 } from 'aws-sdk';

const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Prefix: `deneme/${username}/`, // Kullanıcı adına göre dosyaların ön eki
        };

        const data = await s3.listObjectsV2(params).promise();
        const files = data.Contents.map(item => ({
            key: item.Key,
            lastModified: item.LastModified,
            size: item.Size,
        }));

        return new Response(JSON.stringify(files), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error listing files:', error);
        return new Response(JSON.stringify([]), {
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

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const folderName = searchParams.get('folderName');
        const username = searchParams.get('username');

        if (!folderName || !username) {
            return new Response(JSON.stringify({ error: 'folderName and username are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: `deneme/${username}/${folderName}/`, // Klasör adı
        };

        await s3.putObject(params).promise();

        return new Response(JSON.stringify({ message: 'Folder created successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating folder:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
