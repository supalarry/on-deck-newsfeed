import UserCard from 'components/UserCard';
import ProjectCard from 'components/ProjectCard';
import AnnouncementCard from 'components/AnnouncementCard'; 
import {Waypoint} from 'react-waypoint';
import {Post} from '../../../shared/types';
import {isUser, isProject, isAnnouncement} from '../helpers/identifyPostType';

type Props = {
  posts: Post[];
  handleScrolledToBottom: Function;
}

export default function Newsfeed({posts, handleScrolledToBottom} : Props) {
  return (
    <section>
      {posts.map((post, index) => {
        if (isUser(post)) {
          return <UserCard user={post} key={`${index}_${post.id}`}/>
        } else if (isProject(post)) {
          return <ProjectCard project={post} key={`${index}_${post.id}`}/>
        } else if (isAnnouncement(post)) {
          return <AnnouncementCard announcement={post} key={`${index}_${post.id}`}/>
        }
      })}
      <Waypoint onEnter={() => handleScrolledToBottom()}></Waypoint>
    </section>
  )
}