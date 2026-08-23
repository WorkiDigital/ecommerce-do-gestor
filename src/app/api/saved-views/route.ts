import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get('accountId') || undefined;

    const savedViews = await prisma.savedView.findMany({
      where: accountId ? { accountId } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, savedViews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || 'demo_user_gestor';
    const body = await req.json();
    const { name, description, filterState, accountId, isDefault } = body;

    if (!name || !filterState) {
      return NextResponse.json({ error: 'Nome e estado de filtros são obrigatórios' }, { status: 400 });
    }

    const savedView = await prisma.savedView.create({
      data: {
        userId,
        name,
        description,
        filterState,
        accountId: accountId || null,
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json({ success: true, savedView }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    await prisma.savedView.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
