import db, {UserRow} from '../../db'

export default async function writers(): Promise<UserRow[]> {
  const writers: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      WHERE fellowship = ?
    `,
    ['writers']
  )
  return writers
}
