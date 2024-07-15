import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  const  {content}  = await req.json()
  const user = await getUserFromClerkID()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: content,
    },
  })

  return NextResponse.json({ data: updatedEntry })
}
