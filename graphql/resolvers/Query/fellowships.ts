import db, {FellowshipRow} from '../../db'

export default async function fellowships(parent: unknown): Promise<FellowshipRow[]> {
  const fellowships: FellowshipRow[] = await db.getAll(
    'SELECT * FROM fellowships'
  )
  return fellowships
}
