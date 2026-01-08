import { LitElement } from 'lit'
import { tailwindStyles } from './styles/tailwind.js'

/**
 * Base element that includes Tailwind styles
 * All components should extend this class to get Tailwind CSS utilities
 */
export class TailwindElement extends LitElement {
  static styles = [tailwindStyles]
}
