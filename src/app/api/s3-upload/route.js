import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    },
});

async function uploadFileToS3(file, fileName, folderName) {
    const fileBuffer = file;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `deneme/${folderName}/${fileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return fileName;
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const username = formData.get("username");

        if (!file || !username) {
            return NextResponse.json({ error: "File and username are required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name, `${username}`);

        return NextResponse.json({ success: true, fileName });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Error uploading file" });
    }
}
