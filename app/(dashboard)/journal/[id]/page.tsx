
import Editor from '@/app/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
