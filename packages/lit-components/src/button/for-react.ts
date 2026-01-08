import React from 'react';
import { createComponent } from '@lit/react';
import { LztButton } from './button';

export interface TailwindButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onButtonClick?: (event: CustomEvent) => void;
}

export const TailwindButton = createComponent({
  tagName: 'lzt-button',
  elementClass: LztButton,
  react: React,
  events: {
    onButtonClick: 'button-click'
  }
});