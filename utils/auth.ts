import { prisma } from './db'
import { auth } from '@clerk/nextjs/server'

export const getUserFromClerkID = async () => {
    const { userId } = auth()
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId as string,
      },
    })
  
    return user
  }