import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../utils/base-element.js'

@customElement('lzt-button')
export class LztButton extends TailwindElement {
  static styles = [
    ...TailwindElement.styles,
    css`
      :host {
        display: inline-block;
      }
    `
  ]

  @property({ type: String })
  label = 'Button'

  @property({ type: String })
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'danger' = 'default'

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium'

  @property({ type: Boolean })
  disabled = false

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button'

  private handleClick(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.dispatchEvent(
      new CustomEvent('button-click', {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true
      })
    )
  }

  private getButtonClasses(): string {
    const baseClasses = 'rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    }

    const variantClasses = {
      default: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }

    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${disabledClasses}`
  }

  render() {
    return html`
      <button
        class="${this.getButtonClasses()}"
        ?disabled="${this.disabled}"
        type="${this.type}"
        @click="${this.handleClick}"
      >
        <slot>${this.label}</slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lzt-button': LztButton
  }
}
