import { LitElement, css, unsafeCSS } from 'lit'
import baseStyles from '../styles/base.css?inline'

/**
 * Base element for all LZT components
 * Provides common functionality and can be extended to add shared styles
 */
export class BaseElement extends LitElement {
  static styles = [
    css`${unsafeCSS(baseStyles)}`
  ]
}
