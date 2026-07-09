/**
 * Admin API route: Create package (admin only)
 * POST /api/admin/packages
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPackage } from "@/services/package.service";
import { createPackageSchema } from "@/lib/validation";
import { handleApiError, ApiError } from "@/lib/api-error";

export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin role verification
    const body = await request.json();

    // Validate input
    const validatedData = createPackageSchema.parse(body);

    // Create package
    const pkg = await createPackage(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: pkg,
        message: "Package created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    const { statusCode, body } = handleApiError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
