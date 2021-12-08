import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
  announcement: Announcement;
}

type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
}


export default function AnnouncementCard({announcement}: Props) {
  return (
    <Card>
      <Columns>
        <ColumnRight>
          <h2>{announcement.title}</h2>
          <Markdown>{announcement.body}</Markdown>
        </ColumnRight>
      </Columns>
    </Card>
  )
}


const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`
