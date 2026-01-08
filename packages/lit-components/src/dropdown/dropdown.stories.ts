import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import './dropdown.js'

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'lzt-dropdown',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '未選択時のラベルテキスト'
    },
    value: {
      control: 'text',
      description: '選択された値'
    }
  },
  args: {
    label: 'Select...',
    value: ''
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <lzt-dropdown .label=${args.label} .value=${args.value}>
      <lzt-dropdown-item value="option1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="option2">Option 2</lzt-dropdown-item>
      <lzt-dropdown-item value="option3">Option 3</lzt-dropdown-item>
    </lzt-dropdown>
  `
}

export const WithCustomLabel: Story = {
  args: {
    label: 'Choose an option'
  },
  render: (args) => html`
    <lzt-dropdown .label=${args.label} .value=${args.value}>
      <lzt-dropdown-item value="option1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="option2">Option 2</lzt-dropdown-item>
      <lzt-dropdown-item value="option3">Option 3</lzt-dropdown-item>
    </lzt-dropdown>
  `
}

export const WithPreselectedValue: Story = {
  args: {
    label: 'Select an option',
    value: 'option2'
  },
  render: (args) => html`
    <lzt-dropdown .label=${args.label} .value=${args.value}>
      <lzt-dropdown-item value="option1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="option2">Option 2</lzt-dropdown-item>
      <lzt-dropdown-item value="option3">Option 3</lzt-dropdown-item>
    </lzt-dropdown>
  `
}

export const WithManyOptions: Story = {
  render: (args) => html`
    <lzt-dropdown .label=${args.label} .value=${args.value}>
      <lzt-dropdown-item value="1">Option 1</lzt-dropdown-item>
      <lzt-dropdown-item value="2">Option 2</lzt-dropdown-item>
      <lzt-dropdown-item value="3">Option 3</lzt-dropdown-item>
      <lzt-dropdown-item value="4">Option 4</lzt-dropdown-item>
      <lzt-dropdown-item value="5">Option 5</lzt-dropdown-item>
      <lzt-dropdown-item value="6">Option 6</lzt-dropdown-item>
      <lzt-dropdown-item value="7">Option 7</lzt-dropdown-item>
      <lzt-dropdown-item value="8">Option 8</lzt-dropdown-item>
      <lzt-dropdown-item value="9">Option 9</lzt-dropdown-item>
      <lzt-dropdown-item value="10">Option 10</lzt-dropdown-item>
    </lzt-dropdown>
  `
}

export const CountrySelector: Story = {
  args: {
    label: 'Select your country'
  },
  render: (args) => html`
    <lzt-dropdown .label=${args.label}>
      <lzt-dropdown-item value="jp">🇯🇵 Japan</lzt-dropdown-item>
      <lzt-dropdown-item value="us">🇺🇸 United States</lzt-dropdown-item>
      <lzt-dropdown-item value="uk">🇬🇧 United Kingdom</lzt-dropdown-item>
      <lzt-dropdown-item value="ca">🇨🇦 Canada</lzt-dropdown-item>
      <lzt-dropdown-item value="au">🇦🇺 Australia</lzt-dropdown-item>
      <lzt-dropdown-item value="de">🇩🇪 Germany</lzt-dropdown-item>
      <lzt-dropdown-item value="fr">🇫🇷 France</lzt-dropdown-item>
    </lzt-dropdown>
  `
}

export const WithEventHandler: Story = {
  render: (args) => {
    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent
      console.log('Dropdown changed:', customEvent.detail)
      alert(`Selected: ${customEvent.detail.label} (${customEvent.detail.value})`)
    }

    return html`
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p>Select an option to see the change event in console and alert</p>
        <lzt-dropdown .label=${args.label} @change=${handleChange}>
          <lzt-dropdown-item value="red">Red</lzt-dropdown-item>
          <lzt-dropdown-item value="green">Green</lzt-dropdown-item>
          <lzt-dropdown-item value="blue">Blue</lzt-dropdown-item>
          <lzt-dropdown-item value="yellow">Yellow</lzt-dropdown-item>
        </lzt-dropdown>
      </div>
    `
  }
}

export const MultipleDropdowns: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 0.5rem;">Select Size</h3>
        <lzt-dropdown label="Choose size">
          <lzt-dropdown-item value="xs">Extra Small</lzt-dropdown-item>
          <lzt-dropdown-item value="s">Small</lzt-dropdown-item>
          <lzt-dropdown-item value="m">Medium</lzt-dropdown-item>
          <lzt-dropdown-item value="l">Large</lzt-dropdown-item>
          <lzt-dropdown-item value="xl">Extra Large</lzt-dropdown-item>
        </lzt-dropdown>
      </div>

      <div>
        <h3 style="margin-bottom: 0.5rem;">Select Color</h3>
        <lzt-dropdown label="Choose color">
          <lzt-dropdown-item value="black">Black</lzt-dropdown-item>
          <lzt-dropdown-item value="white">White</lzt-dropdown-item>
          <lzt-dropdown-item value="red">Red</lzt-dropdown-item>
          <lzt-dropdown-item value="blue">Blue</lzt-dropdown-item>
        </lzt-dropdown>
      </div>

      <div>
        <h3 style="margin-bottom: 0.5rem;">Select Quantity</h3>
        <lzt-dropdown label="Choose quantity">
          <lzt-dropdown-item value="1">1</lzt-dropdown-item>
          <lzt-dropdown-item value="2">2</lzt-dropdown-item>
          <lzt-dropdown-item value="3">3</lzt-dropdown-item>
          <lzt-dropdown-item value="4">4</lzt-dropdown-item>
          <lzt-dropdown-item value="5">5</lzt-dropdown-item>
        </lzt-dropdown>
      </div>
    </div>
  `
}

export const InlineLayout: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <span>Sort by:</span>
      <lzt-dropdown label="Select">
        <lzt-dropdown-item value="name">Name</lzt-dropdown-item>
        <lzt-dropdown-item value="date">Date</lzt-dropdown-item>
        <lzt-dropdown-item value="size">Size</lzt-dropdown-item>
      </lzt-dropdown>

      <span>Order:</span>
      <lzt-dropdown label="Select">
        <lzt-dropdown-item value="asc">Ascending</lzt-dropdown-item>
        <lzt-dropdown-item value="desc">Descending</lzt-dropdown-item>
      </lzt-dropdown>
    </div>
  `
}
