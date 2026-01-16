import { useState } from 'react'
import { LztButtonReact } from '@lzt/lit-components/react/button'
import { LztDropdownReact, LztDropdownItemReact } from '@lzt/lit-components/react/dropdown'
import styles from './App.module.css'

function App() {
  const [buttonClicks, setButtonClicks] = useState(0)
  const [selectedValue, setSelectedValue] = useState('')

  const handleButtonClick = () => {
    setButtonClicks(prev => prev + 1)
  }

  const handleDropdownChange = (e: CustomEvent) => {
    setSelectedValue(e.detail.value)
    console.log('Dropdown changed:', e.detail)
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          LZT UI Components in React
        </h1>

        <div className={styles.sections}>
          {/* Button Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Button Component
            </h2>
            <p className={styles.sectionText}>
              Clicks: <span className={styles.valueHighlight}>{buttonClicks}</span>
            </p>
            <div className={styles.buttonGroup}>
              <LztButtonReact onButtonClick={handleButtonClick}>
                Default Button
              </LztButtonReact>
              <LztButtonReact variant="primary" onButtonClick={handleButtonClick}>
                Primary Button
              </LztButtonReact>
              <LztButtonReact variant="secondary" onButtonClick={handleButtonClick}>
                Secondary Button
              </LztButtonReact>
              <LztButtonReact variant="danger" onButtonClick={handleButtonClick}>
                Danger Button
              </LztButtonReact>
              <LztButtonReact disabled>
                Disabled Button
              </LztButtonReact>
            </div>
          </section>

          {/* Dropdown Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Dropdown Component
            </h2>
            <p className={styles.sectionText}>
              Selected value:{' '}
              <span className={styles.valueHighlight}>
                {selectedValue || 'None'}
              </span>
            </p>
            <LztDropdownReact
              label="Select an option"
              onChange={handleDropdownChange}
            >
              <LztDropdownItemReact value="option1">
                Option 1
              </LztDropdownItemReact>
              <LztDropdownItemReact value="option2">
                Option 2
              </LztDropdownItemReact>
              <LztDropdownItemReact value="option3">
                Option 3
              </LztDropdownItemReact>
              <LztDropdownItemReact value="option4">
                Option 4
              </LztDropdownItemReact>
            </LztDropdownReact>
          </section>

          {/* Info Section */}
          <section className={styles.infoSection}>
            <h3 className={styles.infoTitle}>
              About This Demo
            </h3>
            <p className={styles.infoText}>
              This React application uses React-wrapped Web Components built with Lit.
              The components provide proper TypeScript types and React-friendly event handling.
              Web Components have their styles encapsulated internally using Shadow DOM.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
