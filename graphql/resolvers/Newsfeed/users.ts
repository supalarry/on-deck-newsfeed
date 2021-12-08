import db, {UserRow} from '../../db'
import {DB_QUERY_BATCH_SIZE} from '../../../shared/constants';

type Args = {
  fellowship: string;
  offset: number;
}

export default async function users(parent: unknown, {fellowship, offset}: Args): Promise<UserRow[]> {
  const users: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      WHERE fellowship = ?
      ORDER BY created_ts DESC LIMIT ? OFFSET ?
    `,
    [fellowship, DB_QUERY_BATCH_SIZE, offset]
  )
  return users
}
