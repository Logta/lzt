import React from 'react'
import { createComponent } from '@lit/react'
import { LztDropdown, LztDropdownItem } from './dropdown.js'

export interface TailwindDropdownProps {
  label?: string
  value?: string
  options?: Array<{ label: string; value: string }>
  onChange?: (event: CustomEvent) => void
  children?: React.ReactNode
}

export interface TailwindDropdownItemProps {
  value: string
  selected?: boolean
  children?: React.ReactNode
}

const TailwindDropdownBase = createComponent({
  tagName: 'lzt-dropdown',
  elementClass: LztDropdown,
  react: React,
  events: {
    onChange: 'change'
  }
})

// Type assertion to override @lit/react's Event type with CustomEvent
export const TailwindDropdown = TailwindDropdownBase as React.ForwardRefExoticComponent<
  TailwindDropdownProps & React.RefAttributes<LztDropdown>
>

export const TailwindDropdownItem = createComponent({
  tagName: 'lzt-dropdown-item',
  elementClass: LztDropdownItem,
  react: React
})