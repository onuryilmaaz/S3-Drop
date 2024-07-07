import { NextResponse } from 'next/server';
import aws from 'aws-sdk';

// AWS S3 yapılandırması
aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
});

const s3 = new aws.S3();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fileKey = searchParams.get('fileKey'); // API'den dosya anahtarını alın

  if (!fileKey) {
    return new NextResponse('Dosya anahtarı sağlanmadı', { status: 400 });
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME, // S3 bucket ismi
    Key: fileKey, // İndirmek istediğiniz dosyanın anahtarı
  };

  try {
    const data = await s3.getObject(params).promise();

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename=${fileKey.split('/').pop()}`);
    headers.append('Content-Type', data.ContentType);

    return new NextResponse(data.Body, { headers });
  } catch (error) {
    console.error('S3 dosyası indirilirken hata oluştu:', error);
    return new NextResponse('Dosya indirilirken hata oluştu.', { status: 500 });
  }
}
