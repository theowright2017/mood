'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave ({
    interval: 3000,
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsSaving(true)

      await updateEntry(entry.id, { content: _text })

    //   setEntry(data)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full">
        {isSaving && <div>...Saving</div>}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Editor
