import figma from '@figma/code-connect'
import { ButtonClean } from './button'

figma.connect(
  ButtonClean,
  'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_BUTTON_NODE_ID',
  {
    props: {
      intent: figma.enum('Intent', {
        'Primary': 'primary',
        'Secondary': 'secondary',
        'Accent': 'accent',
        'Accent Finished': 'accent-finished',
      }),
      size: figma.enum('Size', {
        'S': 'sm',
        'M': 'md',
        'L': 'lg',
      }),
      shape: figma.enum('Shape', {
        'Default': 'default',
        'Round': 'round',
        'Circle': 'circle',
      }),
      disabled: figma.boolean('Disabled'),
      selected: figma.boolean('Selected'),
    },

    example: ({ intent, size, shape, disabled, selected }) =>
      `<ButtonClean intent="${intent || 'primary'}" size="${size || 'md'}" shape="${shape || 'default'}"${disabled ? ' disabled' : ''}${selected ? ' selected' : ''}>Label</ButtonClean>`
  }
)

