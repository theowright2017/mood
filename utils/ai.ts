import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('the mood of the person who wrote the journal.'),
    subject: z.string().describe('the main subject of the entry itself.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative (example: does it contain negative emotions?).'
      ),
    colour: z
      .string()
      .describe(
        'a hexidecimal code that represents the mood of the entry (example: #0101fe for blue representing happiness).'
      ),
  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (prompt) => {
    const formatted = await getPrompt(prompt)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo-0125' })
  model.apiKey = process.env.OPENAI_API_KEY
  const result = await model.invoke(formatted)
  console.log('RES', result)

  try {
    return parser.parse(result)
  } catch (err) {
    console.log(err)
  }
}
