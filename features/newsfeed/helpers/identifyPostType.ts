import {Post, User, Project, Announcement} from '../../../shared/types'

export function isUser(post: Post): post is User {
  return post.__typename === 'User';
}

export function isProject(post: Post): post is Project {
  return post.__typename === 'Project';
}

export function isAnnouncement(post: Post): post is Announcement {
  return post.__typename === 'Announcement';
}