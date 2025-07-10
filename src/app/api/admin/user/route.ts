
import { fetchAdminUser } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const admin = await fetchAdminUser();
    if (!admin) {
      return NextResponse.json({ message: 'Admin user not found.' }, { status: 404 });
    }
    return NextResponse.json(admin);
  } catch (error) {
    console.error('API Error fetching admin user:', error);
    return NextResponse.json({ message: 'Failed to fetch admin user.' }, { status: 500 });
  }
}
