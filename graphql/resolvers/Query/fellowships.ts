import db, {FellowshipRow} from '../../db'

export default async function fellowships(): Promise<FellowshipRow[]> {
  const fellowships: FellowshipRow[] = await db.getAll(
    'SELECT * FROM fellowships'
  )
  return fellowships
}
