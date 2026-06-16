import { NextRequest, NextResponse } from 'next/server';
import { EstateReport, ApiResponse } from '../../lib/types';

// This is a mock API endpoint. In production, you'd connect to a database
const reports: EstateReport[] = [];

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<EstateReport>>> {
  try {
    const report = (await request.json()) as EstateReport;

    // Validate required fields
    if (!report.snapshots || report.snapshots.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Report must contain at least one snapshot',
        },
        { status: 400 }
      );
    }

    // Add to reports (in production, save to database)
    reports.push(report);

    return NextResponse.json(
      {
        success: true,
        data: report,
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

export async function GET(): Promise<NextResponse<ApiResponse<EstateReport[]>>> {
  return NextResponse.json({
    success: true,
    data: reports,
  });
}
