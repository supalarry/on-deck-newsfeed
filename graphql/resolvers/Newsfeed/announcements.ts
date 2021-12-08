import db, {AnnouncementRow} from '../../db'

type Args = {
  fellowship: string;
}

export default async function announcements(parent: unknown, {fellowship}: Args): Promise<AnnouncementRow[]> {
  const announcements: AnnouncementRow[] = await db.getAll(
    `
      SELECT *
      FROM announcements
      WHERE fellowship = ? OR fellowship = ?
    `,
    [fellowship, 'all']
  )
  return announcements
}
