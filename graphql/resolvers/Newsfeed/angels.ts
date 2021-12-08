import db, {UserRow} from '../../db'

export default async function angels(): Promise<UserRow[]> {
  const angels: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      WHERE fellowship = ?
    `,
    ['angels']
  )
  return angels
}
