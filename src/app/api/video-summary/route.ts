export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;
  const res = await fetch(
    "https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize",
    {
      method: "POST",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.CLIENT_ID as string,
        "X-NCP-APIGW-API-KEY": process.env.CLIENT_SECRET as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        document: {
          title,
          content,
        },
        option: {
          language: "ko",
        },
      }),
    }
  );

  const result = await res.json();

  return Response.json(
    { data: result },
    {
      status: result.status,
    }
  );
}
