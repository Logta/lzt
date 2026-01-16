import { html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { BaseElement } from '../utils/base-element.js'
import buttonStyles from './button.css?inline'

@customElement('lzt-button')
export class LztButton extends BaseElement {
  static styles = [
    ...BaseElement.styles,
    css`${unsafeCSS(buttonStyles)}`,
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
    return `${this.size} ${this.variant}`
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
