import { NextRequest, NextResponse } from 'next/server';
import { EstateSnapshot, ApiResponse } from '../../lib/types';

// This is a mock API endpoint. In production, you'd connect to a database
const snapshots: EstateSnapshot[] = [];

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<EstateSnapshot>>> {
  try {
    const snapshot = (await request.json()) as EstateSnapshot;

    // Validate required fields
    if (!snapshot.address || !snapshot.propertyValue) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: address, propertyValue',
        },
        { status: 400 }
      );
    }

    // Add to snapshots (in production, save to database)
    snapshots.push(snapshot);

    return NextResponse.json(
      {
        success: true,
        data: snapshot,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<ApiResponse<EstateSnapshot[]>>> {
  return NextResponse.json({
    success: true,
    data: snapshots,
  });
}
