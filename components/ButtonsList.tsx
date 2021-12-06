import { Button, Stack } from '@chakra-ui/react'

interface Button {
  id: number;
  name: string;
}

export default function ButtonsList({buttons, handleButtonClick} : {buttons: Button[], handleButtonClick: (id: number) => void}) {
  return (
    <Stack direction='row' spacing={4} align='center'>
        {
          buttons && buttons.map(button => {
            return (
              <Button
                onClick={() => handleButtonClick(button.id)}
                key={button.id}
                colorScheme='blue'
                variant='outline'>
                  {button.name}
              </Button>
            )
          })
        }
      </Stack>
  )
}