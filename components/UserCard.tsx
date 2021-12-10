import Link from 'next/link'
import styled from 'styled-components'
import { Flex, Image, Box, Text } from '@chakra-ui/react';

type Props = {
  user: User;
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "founders" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
}

export default function UserCard({user}: Props) {
  return (
    <Box p={{base: 6, md: 8}} borderRadius="md" bg="#1b263c" color="#fafafa">
      <Flex align="center">
        <Image bg="#fafafa" borderRadius="full" p={2} src={user.avatar_url} boxSize="50px" />
        <Box ml={4}>
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">{user.name}</Text>
          <Text textTransform="capitalize" mt={-2} opacity="0.7">
            {user.fellowship} fellowship
          </Text>
        </Box>
      </Flex>
      <Box my={6}>
          <Text>{user.bio}</Text>
      </Box>
        {!!user.projects?.length && (
        <Box bg="#182135" borderRadius="md" px={4} py={2}>
            <>
              <Text opacity="0.7" mb={2}>Projects</Text>
              {user.projects.map((project, index) => (
                <Project key={`${index}_${project.id}`} project={project} />
              ))}
            </>
        </Box>
        )}
    </Box>
  )
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

function Project({project}: {project: Project}) {
  return (
    <ProjectContainer>
      <ProjectColumnLeft>
        <ProjectIcon src={project.icon_url} />
      </ProjectColumnLeft>
      <ProjectColumnRight>
        <Link href={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </ProjectColumnRight>
    </ProjectContainer>
  )
}

const ProjectIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ProjectColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const ProjectColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
