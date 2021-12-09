import db, {UserRow} from '../../db'
import {DB_QUERY_BATCH_SIZE} from '../../../shared/constants';

type Args = {
  fellowships: string[];
  offset: number;
}

export default async function users(parent: unknown, {fellowships, offset}: Args): Promise<UserRow[]> {
  const WHERE_STATEMENT = addMultipleOrClauses('fellowship', fellowships.length);
  const users: UserRow[] = await db.getAll(
    `
      SELECT *
      FROM users
      ${WHERE_STATEMENT}
      ORDER BY created_ts DESC LIMIT ? OFFSET ?
    `,
    [...fellowships, DB_QUERY_BATCH_SIZE, offset]
  )
  return users
}

function addMultipleOrClauses(column: string, count: number): string {
  let statement = `WHERE ${column} = ?`;
  count -= 1;
  while (count > 0) {
    statement = `${statement} OR ${column} = ?`
    count -= 1;
  }
  return statement;
}