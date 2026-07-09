/**
 * API route: Get user bookings
 * GET /api/user/bookings
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserBookings } from "@/services/booking.service";
import { handleApiError, ApiError } from "@/lib/api-error";

export async function GET(request: NextRequest) {
  try {
    // TODO: Get authenticated user ID from session
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const skip = (page - 1) * pageSize;

    const { bookings, total } = await getUserBookings(userId, skip, pageSize);

    return NextResponse.json(
      {
        success: true,
        data: bookings,
        total,
        page,
        pageSize,
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleApiError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
