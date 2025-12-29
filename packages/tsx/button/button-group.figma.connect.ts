import figma from '@figma/code-connect'
import { ButtonGroup } from './button-group'

figma.connect(
  ButtonGroup,
  'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_BUTTON_GROUP_NODE_ID',
  {
    props: {
      orientation: figma.enum('Orientation', {
        'Horizontal': 'horizontal',
        'Vertical': 'vertical',
      }),
    },

    example: ({ orientation }) =>
      `<ButtonGroup orientation="${orientation || 'horizontal'}">...</ButtonGroup>`
  }
)

