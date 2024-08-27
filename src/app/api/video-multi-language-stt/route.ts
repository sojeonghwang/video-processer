export const maxDuration = 60;

export async function POST(req: Request) {
  const formData = await req.formData();

  const res = await fetch(process.env.INVOKE_URL ?? "", {
    method: "POST",
    headers: {
      "X-CLOVASPEECH-API-KEY": process.env.CLOVASPEECH_API_KEY ?? "",
    },
    body: formData,
  });

  const result = await res.json();

  if (!!result && result.message === "Succeeded") {
    return Response.json({ data: result.segments });
  }

  return Response.json(
    { data: undefined, message: "STT에 실패했습니다." },
    {
      status: 500,
    }
  );
}
