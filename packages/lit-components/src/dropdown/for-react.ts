import React from 'react'
import { createComponent } from '@lit/react'
import { LztDropdown, LztDropdownItem } from './dropdown.js'

export interface TailwindDropdownProps {
  label?: string
  value?: string
  onChange?: (event: CustomEvent) => void
  children?: React.ReactNode
}

export interface TailwindDropdownItemProps {
  value: string
  selected?: boolean
  children?: React.ReactNode
}

export const TailwindDropdown = createComponent({
  tagName: 'lzt-dropdown',
  elementClass: LztDropdown,
  react: React,
  events: {
    onChange: 'change'
  }
})

export const TailwindDropdownItem = createComponent({
  tagName: 'lzt-dropdown-item',
  elementClass: LztDropdownItem,
  react: React
})