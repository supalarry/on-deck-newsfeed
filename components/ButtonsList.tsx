import { Button, Stack } from '@chakra-ui/react'

interface Button {
  id: number;
  name: string;
}

export default function ButtonsList({buttons, handleButtonClick, activeButtonId} : {buttons: Button[], handleButtonClick: (id: number) => void, activeButtonId: number}) {
  return (
    <Stack direction='row' spacing={4} align='center'>
        {
          buttons && buttons.map(button => {
            return (
              <Button
                isActive={button.id === activeButtonId}
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