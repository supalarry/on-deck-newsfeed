import db, {UserRow} from '../../db'

export default async function founders(): Promise<UserRow[]> {
  const founders: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      WHERE fellowship = ?
    `,
    ['founders']
  )
  return founders
}
