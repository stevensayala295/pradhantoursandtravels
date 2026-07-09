/**
 * API route: Health check
 * GET /api/health
 */

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "API is healthy",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
