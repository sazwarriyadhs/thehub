import { fetchAllInventoryItems } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await fetchAllInventoryItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('API Error fetching inventory:', error);
    return NextResponse.json({ message: 'Failed to fetch inventory items.' }, { status: 500 });
  }
}
