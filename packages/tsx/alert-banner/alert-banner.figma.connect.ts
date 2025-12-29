import figma from '@figma/code-connect'
import { AlertBanner } from './alert-banner'

figma.connect(
  AlertBanner,
  'https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME?node-id=YOUR_ALERT_BANNER_NODE_ID',
  {
    props: {
      variant: figma.enum('Variant', {
        'Info': 'info',
        'Warning': 'warning',
        'Error': 'error',
        'Success': 'success',
      }),
      dismissible: figma.boolean('Dismissible'),
      allowPersistence: figma.boolean('Allow Persistence'),
      message: figma.string('Message'),
    },

    example: ({ id, variant, dismissible, allowPersistence, message }) => {
      return `<AlertBanner id="${id || 'banner-1'}" variant="${variant || 'info'}"${dismissible ? ' dismissible' : ''}${allowPersistence ? ' allowPersistence' : ''}${message ? ` message="${message}"` : ''}>...</AlertBanner>`
    }
  }
)

