import { Button, Stack } from '@chakra-ui/react'

interface Button {
  name: string;
}

export default function ButtonsList({buttons, handleButtonClick, activeButtonName} : {buttons: Button[], handleButtonClick: (name: any) => void, activeButtonName: string}) {
  return (
    <Stack direction='row' spacing={4} align='center'>
        {
          buttons && buttons.map(button => {
            return (
              <Button
                isActive={button.name === activeButtonName}
                onClick={() => handleButtonClick(button.name)}
                key={button.name}
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