import db, {FellowshipRow} from '../../db'

export default async function fellowships(parent: unknown): Promise<FellowshipRow[]> {
  const fellowships: FellowshipRow[] | undefined = await db.getAll(
    'SELECT * FROM fellowships'
  )
  if (!fellowships) {
    throw new Error('Fellowships not found')
  }
  return fellowships
}
