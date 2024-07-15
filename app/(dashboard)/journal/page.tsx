import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import { prisma } from '@/utils/db/db'
import { currentUser } from '@clerk/nextjs/server'

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
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries::', entries)
  return (
    <div className='p-10 bg-zinc-500/10 h-full'>
        <h2 className="text-3xl mb-8">Journal</h2>
    <div className="grid grid-cols-3 gap-4 p-10">
      <NewEntryCard />
      {entries.map((ent) => (
            <EntryCard key={ent.id} entry={ent} />
      ))}
    </div>
    </div>)
}

export default JournalPage
