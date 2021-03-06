import UserCard from 'components/UserCard';
import ProjectCard from 'components/ProjectCard';
import AnnouncementCard from 'components/AnnouncementCard'; 
import {Waypoint} from 'react-waypoint';
import {Post} from 'shared/types';
import {isUser, isProject, isAnnouncement} from 'features/newsfeed/helpers/identifyPostType';
import { Box } from '@chakra-ui/react';

type Props = {
  posts: Post[];
  handleScrolledToBottom: Function;
}

export default function Newsfeed({posts, handleScrolledToBottom} : Props) {
  return (
    <section>
      {posts.map((post, index) => {
        if (isUser(post)) {
          return (
            <Box mt={6} key={`${index}_${post.id}`}>
              <UserCard user={post}/>
            </Box>
          )
        } else if (isProject(post)) {
          return (
              <Box mt={6} key={`${index}_${post.id}`}>
                <ProjectCard project={post}/>
              </Box>
            )
        } else if (isAnnouncement(post)) {
          return (
            <Box mt={6} key={`${index}_${post.id}`}>
              <AnnouncementCard announcement={post}/>
              </Box>
            )
        }
      })}
      <Waypoint onEnter={() => handleScrolledToBottom()}></Waypoint>
    </section>
  )
}