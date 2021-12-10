import Link from 'next/link'
import styled from 'styled-components'
import { Flex, Image, Box, Text } from '@chakra-ui/react';

type Props = {
  project: Project;
}

type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

type User = {
  id: number;
  name: string;
  avatar_url: string;
}

export default function ProjectCard({project}: Props) {
  return (
    <Box p={{base: 6, md: 8}} borderRadius="md" bg="#1b263c" color="#fafafa">
      <Flex align="center">
        <Image bg="#fafafa" borderRadius="full" p={2} src={project.icon_url} boxSize="50px" />
        <Box ml={4}>
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">{project.name}</Text>
        </Box>
      </Flex>
      <Box my={6}>
          <Text>{project.description}</Text>
      </Box>
        {!!project.users?.length && (
        <Box bg="#182135" borderRadius="md" px={4} py={2}>
            <>
              <Text opacity="0.7" mb={2}>Participants</Text>
              {project.users.map((user, index) => (
                <Participant key={`${index}_${user.id}`} user={user} />
              ))}
            </>
        </Box>
        )}
    </Box>
  )
}


const Icon = styled.img`
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

function Participant({user}: {user: User}) {
  return (
    <ParticipantContainer>
      <ParticipantColumnLeft>
        <ParticipantAvatar src={user.avatar_url} />
      </ParticipantColumnLeft>
      <ParticipantColumnRight>
        <Link href={`/users/${user.id}`}>
          {user.name}
        </Link>
      </ParticipantColumnRight>
    </ParticipantContainer>
  )
}

const ParticipantAvatar = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ParticipantColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const ParticipantColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
