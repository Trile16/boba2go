import { FilterRuleName, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { buffer } from "stream/consumers";
import { v4 } from "uuid";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");

    const s3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
      },
    });

    const ext = file.name.split(".").slice(-1);
    const newFileName = v4() + "." + ext;

    console.log(newFileName);

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: "boba2go",
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    return Response.json(`https://boba2go.s3.amazonaws.com/${newFileName}`);
  }
  return Response.json(true);
}
