import { css, unsafeCSS } from 'lit'
import globalCss from '../styles.css?inline'

export const tailwindStyles = css`${unsafeCSS(globalCss)}`
