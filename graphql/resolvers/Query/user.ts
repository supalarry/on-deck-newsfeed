import db, { UserRow } from 'graphql/db';

type Args = {
  id: string;
}

export default async function user(parent: unknown, {id}: Args): Promise<UserRow> {
  const user: UserRow | undefined = await db.getOne(
    'SELECT * FROM users WHERE id = ?',
    [id]
  )
  if (!user) {
    throw new Error(`User ${id} not found`)
  }
  return user
}
