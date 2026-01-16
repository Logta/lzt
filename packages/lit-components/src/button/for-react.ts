import React from 'react'
import { createComponent } from '@lit/react'
import { LztButton } from './button.js'

export interface LztButtonProps {
  label?: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onButtonClick?: (event: CustomEvent) => void
  children?: React.ReactNode
}

const LztButtonReactBase = createComponent({
  tagName: 'lzt-button',
  elementClass: LztButton,
  react: React,
  events: {
    onButtonClick: 'button-click'
  }
})

// Type assertion to override @lit/react's Event type with CustomEvent
export const LztButtonReact = LztButtonReactBase as React.ForwardRefExoticComponent<
  LztButtonProps & React.RefAttributes<LztButton>
>