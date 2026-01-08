import { html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import * as menu from '@zag-js/menu'
import { TailwindElement } from '../utils/base-element.js'
import { useMachine } from '../utils/use-machine.js'

interface MenuOption {
  label: string
  value: string
}

interface MenuApi {
  getTriggerProps: () => Record<string, any>
  getContentProps: () => Record<string, any>
  getItemProps: (option: MenuOption) => Record<string, any>
}

@customElement('lzt-dropdown')
export class LztDropdown extends TailwindElement {
  static styles = [
    ...TailwindElement.styles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }
    `
  ]

  @property({ type: String })
  label = 'Select...'

  @property({ type: String })
  value = ''

  @property({ type: Array })
  options: MenuOption[] = []

  @state()
  private selectedLabel = ''

  private service = useMachine(menu.machine, {
    context: {
      open: false,
    },
  })

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.handleOutsideClick)
    this.extractOptionsFromSlot()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.handleOutsideClick)
  }

  private extractOptionsFromSlot() {
    // Extract options from slotted lzt-dropdown-item elements
    const slot = this.shadowRoot?.querySelector('slot')
    if (slot) {
      const items = slot.assignedElements() as LztDropdownItem[]
      this.options = items.map(item => ({
        label: item.textContent?.trim() || '',
        value: item.value
      }))
    }
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.service.context.set('open', false)
      this.requestUpdate()
    }
  }

  private connectApi(): MenuApi {
    const isOpen = this.service.context.get('open') || false

    return {
      getTriggerProps: () => ({
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        role: 'button',
        tabindex: 0,
      }),
      getContentProps: () => ({
        role: 'menu',
        hidden: !isOpen,
      }),
      getItemProps: (option: MenuOption) => ({
        role: 'menuitem',
        'data-value': option.value,
      }),
    }
  }

  private toggleDropdown() {
    const currentOpen = this.service.context.get('open') || false
    this.service.context.set('open', !currentOpen)
    this.requestUpdate()
  }

  private handleItemClick(option: MenuOption) {
    const previousValue = this.value
    this.value = option.value
    this.selectedLabel = option.label
    this.service.context.set('open', false)

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value,
          previousValue,
          label: this.selectedLabel
        },
        bubbles: true,
        composed: true
      })
    )

    this.requestUpdate()
  }

  firstUpdated() {
    this.extractOptionsFromSlot()
  }

  render() {
    const api = this.connectApi()
    const triggerProps = api.getTriggerProps()
    const contentProps = api.getContentProps()
    const displayLabel = this.selectedLabel || this.label
    const isOpen = this.service.context.get('open') || false

    return html`
      <div class="relative inline-block">
        <button
          class="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center justify-between gap-2 cursor-pointer hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px] ${isOpen ? 'border-blue-500' : ''}"
          @click="${this.toggleDropdown}"
          aria-haspopup="${triggerProps['aria-haspopup']}"
          aria-expanded="${triggerProps['aria-expanded']}"
          role="${triggerProps.role}"
          tabindex="${triggerProps.tabindex}"
        >
          <span class="text-gray-900">${displayLabel}</span>
          <div class="transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}" style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid currentColor;"></div>
        </button>

        ${!contentProps.hidden ? html`
          <div
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
            role="${contentProps.role}"
          >
            ${this.options.length > 0 ? this.options.map(option => {
              const itemProps = api.getItemProps(option)
              const isSelected = this.value === option.value
              return html`
                <div
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-gray-900 ${isSelected ? 'bg-blue-50 text-blue-600' : ''}"
                  role="${itemProps.role}"
                  data-value="${itemProps['data-value']}"
                  @click="${() => this.handleItemClick(option)}"
                >
                  ${option.label}
                </div>
              `
            }) : html`
              <slot @slotchange="${this.extractOptionsFromSlot}"></slot>
            `}
          </div>
        ` : ''}
      </div>
    `
  }
}

@customElement('lzt-dropdown-item')
export class LztDropdownItem extends TailwindElement {
  static styles = [
    ...TailwindElement.styles,
    css`
      :host {
        display: block;
      }
    `
  ]

  @property({ type: String })
  value = ''

  @property({ type: Boolean })
  selected = false

  render() {
    return html`
      <div class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-gray-900 ${this.selected ? 'bg-blue-50 text-blue-600' : ''}" role="option">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lzt-dropdown': LztDropdown
    'lzt-dropdown-item': LztDropdownItem
  }
}
