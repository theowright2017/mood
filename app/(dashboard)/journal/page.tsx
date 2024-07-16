import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import { analyze } from '@/utils/ai'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

const getEntries = async () => {
  const user = await currentUser()

  const dbUser = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: user?.id,
    },
  })

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true
    }
  })

  // console.log('ANALYZE::', await analyze('today was wonderful I had such a good time seeing family and friends'))
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries::', entries)
  return (
    <div className="p-10 bg-zinc-500/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((ent) => (
          <Link key={ent.id} href={`/journal/${ent.id}`}>
            <EntryCard key={ent.id} entry={ent} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
