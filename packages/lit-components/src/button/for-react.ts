import React from 'react'
import { createComponent } from '@lit/react'
import { LztButton } from './button.js'

export interface TailwindButtonProps {
  label?: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onButtonClick?: (event: CustomEvent) => void
  children?: React.ReactNode
}

export const TailwindButton = createComponent({
  tagName: 'lzt-button',
  elementClass: LztButton,
  react: React,
  events: {
    onButtonClick: 'button-click'
  }
})