
import { fetchClientById } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const client = await fetchClientById(id);

    if (!client) {
      return NextResponse.json({ message: 'Client not found.' }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error('API Error fetching client:', error);
    return NextResponse.json({ message: 'Failed to fetch client.' }, { status: 500 });
  }
}
