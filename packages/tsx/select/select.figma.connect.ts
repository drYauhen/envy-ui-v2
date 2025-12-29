import figma from '@figma/code-connect'
import { Select } from './select'

figma.connect(
  Select,
  'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_SELECT_NODE_ID',
  {
    props: {
      size: figma.enum('Size', {
        'S': 'sm',
        'M': 'md',
        'L': 'lg',
      }),
      isDisabled: figma.boolean('Disabled'),
      error: figma.boolean('Error'),
      placeholder: figma.string('Placeholder'),
      label: figma.string('Label'),
    },

    example: ({ size, isDisabled, error, placeholder, label }) => {
      return `<Select size="${size || 'md'}"${isDisabled ? ' isDisabled' : ''}${error ? ' error' : ''}${placeholder ? ` placeholder="${placeholder}"` : ''}${label ? ` label="${label}"` : ''} items={[...]} />`
    }
  }
)

