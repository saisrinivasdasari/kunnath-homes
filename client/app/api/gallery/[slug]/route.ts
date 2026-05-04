import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const galleryPath = path.join(process.cwd(), 'public', 'stays', slug);

  try {
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryPath);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/stays/${slug}/${file}`);

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return NextResponse.json([], { status: 500 });
  }
}
