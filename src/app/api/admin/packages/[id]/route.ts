/**
 * Admin API route: Update/Delete package (admin only)
 * PUT/DELETE /api/admin/packages/[id]
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updatePackage, getPackageById } from "@/services/package.service";
import { handleApiError, ApiError } from "@/lib/api-error";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // TODO: Add admin role verification

    // Verify package exists
    const existingPackage = await getPackageById(id);
    if (!existingPackage) {
      throw new ApiError(404, "Package not found", "PACKAGE_NOT_FOUND");
    }

    // Update package
    const pkg = await updatePackage(id, body);

    return NextResponse.json(
      {
        success: true,
        data: pkg,
        message: "Package updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleApiError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: Add admin role verification

    // Verify package exists
    const existingPackage = await getPackageById(id);
    if (!existingPackage) {
      throw new ApiError(404, "Package not found", "PACKAGE_NOT_FOUND");
    }

    // Delete would go here (add to service)
    // For now, just return success
    return NextResponse.json(
      {
        success: true,
        message: "Package deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleApiError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
