import { CATEGORIES, type Category, type Question } from './types'

const now = '2026-09-15T00:00:00.000Z'
const prompts: Record<Category, [string, string, string][]> = {
  Dash: [['What is the fastest land animal?', 'Cheetah', 'It can reach remarkable speeds over short distances.'], ['Which planet is known as the Red Planet?', 'Mars', 'Iron minerals on its surface give it a reddish appearance.'], ['What does CPU stand for?', 'Central Processing Unit', 'It is the primary processor in a computer.']],
  'Solo Freestyle': [['Name a musical instrument with six strings.', 'Guitar', 'A guitar commonly has six strings, though variants exist.'], ['What is the first letter of the Greek alphabet?', 'Alpha', 'Alpha is the first Greek letter.'], ['Which dance style began in the Bronx during the 1970s?', 'Breaking', 'Breaking is one of the four elements of hip-hop culture.']],
  'Random Challenges': [['Name three things that are purple in ten seconds.', 'Any three valid purple objects', 'The host decides whether the response is creative and valid.'], ['Act out a famous sport without speaking.', 'A correctly guessed sport', 'The team has thirty seconds to perform the challenge.'], ['Estimate the number of steps in a minute of walking.', 'A reasonable estimate', 'Closest team wins the challenge.']],
  'Photo Challenge': [['Identify the landmark shown in the image.', 'The Eiffel Tower', 'A Paris landmark completed in 1889.'], ['What color is commonly associated with a ripe banana?', 'Yellow', 'The peel usually turns yellow as it ripens.'], ['Identify the shape of a standard stop sign.', 'Octagon', 'Its eight sides make it recognizable from any direction.']],
  Items: [['What tool is used to measure temperature?', 'Thermometer', 'Thermometers measure temperature.'], ['Which item is used to unlock a door?', 'Key', 'A key operates a matching lock.'], ['What household item is designed to tell time?', 'Clock', 'Clocks display the current time.']],
  Violets: [['What color family gives Team Violets its name?', 'Purple', 'Violet is a vivid purple color.'], ['How many letters are in VIOLETS?', '7', 'V-I-O-L-E-T-S has seven letters.'], ['What is the name of this quiz arena?', 'Team Violets Quiz Arena', 'Welcome to the arena.']],
}

export const DEFAULT_QUESTIONS: Question[] = CATEGORIES.flatMap((category) =>
  prompts[category].slice(0, 2).flatMap(([q, answer, explanation], index) => ([200, 400, 600] as const).map((points, level) => ({
    id: `${category.toLowerCase().replace(/[^a-z]+/g, '-')}-${index + 1}-${points}`,
    categoryId: category,
    questionType: category === 'Random Challenges' ? 'challenge' : category === 'Photo Challenge' ? 'image' : 'text',
    points,
    question: level === 0 ? q : `${q} (${points} point round)`,
    answer,
    explanation,
    choices: category === 'Violets' && index === 0 ? ['Purple', 'Orange', 'Blue', 'Green'] : [],
    imageUrl: category === 'Photo Challenge' ? 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80' : '',
    challengeInstructions: category === 'Random Challenges' ? 'The host starts the timer and chooses the team that completed the task.' : '',
    enabled: true,
    createdAt: now,
    updatedAt: now,
  })))
)
