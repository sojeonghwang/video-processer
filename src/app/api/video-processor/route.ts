export const maxDuration = 30;
import fs from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const formDataEntryValues = Array.from(formData.values());

  let fileUrl = "";
  let fileName = "";
  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());

      fileName = file?.name;
      fileUrl = `src/app/api/video-processor/input/${fileName}`;
      fs.writeFileSync(fileUrl, buffer);
    }
  }

  const res = await fetch(
    "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-NCP-APIGW-API-KEY-ID": process.env.STT_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.STT_CLIENT_SECRET,
      },
      body: fs.createReadStream(fileUrl),
      duplex: "half",
    }
  );

  const result = await res.json();

  // 임시로 작성된 파일 제거
  fs.unlink(fileUrl, (err) => {
    if (err) {
      console.log(`${fileUrl} 제거 실패 수동 제거 요망`);
    }
  });

  if (!result?.text?.length) {
    return Response.json(
      { data: undefined, message: "STT에 실패했습니다." },
      {
        status: 500,
      }
    );
  }

  const data = result.text.split(" ").map((sttText: string, index: number) => {
    return {
      text: sttText,
      id: index,
    };
  });

  return Response.json({ data });
}