import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }, { status: 200 })
}
