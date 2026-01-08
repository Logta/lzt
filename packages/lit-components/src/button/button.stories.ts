import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './button.js'

const meta: Meta = {
  title: 'Components/Button',
  component: 'lzt-button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ボタンのラベルテキスト'
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger'],
      description: 'ボタンのスタイルバリアント'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'ボタンのサイズ'
    },
    disabled: {
      control: 'boolean',
      description: '無効化フラグ'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'ボタンタイプ'
    }
  },
  args: {
    label: 'Button',
    variant: 'default',
    size: 'medium',
    disabled: false,
    type: 'button'
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    label: 'Default Button',
    variant: 'default'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Success: Story = {
  args: {
    label: 'Success Button',
    variant: 'success'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'small'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'large'
  },
  render: (args) => html`
    <lzt-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      .type=${args.type}
    ></lzt-button>
  `
}

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <lzt-button label="Default"></lzt-button>
        <lzt-button label="Primary" variant="primary"></lzt-button>
        <lzt-button label="Secondary" variant="secondary"></lzt-button>
        <lzt-button label="Success" variant="success"></lzt-button>
        <lzt-button label="Danger" variant="danger"></lzt-button>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <lzt-button label="Small" variant="primary" size="small"></lzt-button>
        <lzt-button label="Medium" variant="primary" size="medium"></lzt-button>
        <lzt-button label="Large" variant="primary" size="large"></lzt-button>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <lzt-button label="Enabled" variant="primary"></lzt-button>
        <lzt-button label="Disabled" variant="primary" disabled></lzt-button>
      </div>
    </div>
  `
}

export const WithSlot: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <lzt-button variant="primary">
        ✨ Icon Button
      </lzt-button>
      <lzt-button variant="secondary">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <span>📧</span>
          <span>Contact Us</span>
        </span>
      </lzt-button>
    </div>
  `
}
