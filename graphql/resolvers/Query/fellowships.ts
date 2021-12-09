import db, { FellowshipRow } from 'graphql/db';

export default async function fellowships(): Promise<FellowshipRow[]> {
  const fellowships: FellowshipRow[] = await db.getAll(
    'SELECT * FROM fellowships'
  )
  return fellowships
}
