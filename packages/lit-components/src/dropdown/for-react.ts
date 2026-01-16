import React from 'react'
import { createComponent } from '@lit/react'
import { LztDropdown, LztDropdownItem } from './dropdown.js'

export interface LztDropdownProps {
  label?: string
  value?: string
  options?: Array<{ label: string; value: string }>
  onChange?: (event: CustomEvent) => void
  children?: React.ReactNode
}

export interface LztDropdownItemProps {
  value: string
  selected?: boolean
  children?: React.ReactNode
}

const LztDropdownReactBase = createComponent({
  tagName: 'lzt-dropdown',
  elementClass: LztDropdown,
  react: React,
  events: {
    onChange: 'change'
  }
})

// Type assertion to override @lit/react's Event type with CustomEvent
export const LztDropdownReact = LztDropdownReactBase as React.ForwardRefExoticComponent<
  LztDropdownProps & React.RefAttributes<LztDropdown>
>

export const LztDropdownItemReact = createComponent({
  tagName: 'lzt-dropdown-item',
  elementClass: LztDropdownItem,
  react: React
})