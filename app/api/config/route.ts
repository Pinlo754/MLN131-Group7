export async function GET() {
  const hasGeminiKey = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  return Response.json({
    configured: hasGeminiKey,
    message: hasGeminiKey
      ? 'API configuration is ready'
      : 'Please set NEXT_PUBLIC_GEMINI_API_KEY environment variable',
  });
}
