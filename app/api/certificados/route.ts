import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import path from 'path'
import { buildCertificateRecord } from '@/lib/certificates'

export async function GET() {
  try {
    const certificatesDirectory = path.join(process.cwd(), 'public', 'certificados', 'pdfs')
    const fileNames = await readdir(certificatesDirectory)

    const certificates = fileNames
      .filter((fileName) => fileName.toLowerCase().endsWith('.pdf'))
      .sort((left, right) => left.localeCompare(right, 'pt-BR'))
      .map((fileName) => buildCertificateRecord(fileName))

    return NextResponse.json(certificates, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Não foi possível carregar os certificados.' },
      { status: 500 }
    )
  }
}
