export const GET = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "website",
      timestamp: Date.now(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
