export type FellowshipName = 'founders' | 'angels' | 'writers'

export type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

export type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "founders" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

export type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
}

export type NewsfeedResponse = {
  founders?: User[];
  angels?: User[];
  writers?: User[];
  projects?: Project[];
  announcements: Announcement[]
}