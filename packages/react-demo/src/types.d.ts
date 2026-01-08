import { LztButton, LztDropdown, LztDropdownItem } from '@lzt/lit-components'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lzt-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'default' | 'primary' | 'secondary' | 'danger'
          disabled?: boolean
          type?: 'button' | 'submit' | 'reset'
        },
        HTMLElement
      >
      'lzt-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          label?: string
          value?: string
        },
        HTMLElement
      >
      'lzt-dropdown-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string
          selected?: boolean
        },
        HTMLElement
      >
    }
  }
}
