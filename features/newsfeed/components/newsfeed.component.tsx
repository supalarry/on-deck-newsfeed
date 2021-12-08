import {User, Project, Announcement} from '../../../shared/types'
import UserCard from 'components/UserCard';
import ProjectCard from 'components/ProjectCard';
import AnnouncementCard from 'components/AnnouncementCard'; 
type Post = User | Project | Announcement

type Props = {
  posts: Post[];
}

export default function Newsfeed({posts} : Props) {
  function isUser(post: Post): post is User {
    return post && !!(post as User).bio;
  }

  function isProject(post: Post): post is Project {
    return post && !!(post as Project).description;
  }

  function isAnnouncement(post: Post): post is Announcement {
    return post && !!(post as Announcement).body;
  }

  return (
    <>
      {posts.map((post, index) => {
        if (isUser(post)) {
          return <UserCard user={post} key={`${index}_${post.id}`}/>
        } else if (isProject(post)) {
          return <ProjectCard project={post} key={`${index}_${post.id}`}/>
        } else if (isAnnouncement(post)) {
          return <AnnouncementCard announcement={post} key={`${index}_${post.id}`}/>
        }
      })}
    </>
  )
}