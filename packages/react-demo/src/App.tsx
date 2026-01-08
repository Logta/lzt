import { useState } from 'react'
import './types'

function App() {
  const [buttonClicks, setButtonClicks] = useState(0)
  const [selectedValue, setSelectedValue] = useState('')

  const handleButtonClick = () => {
    setButtonClicks(prev => prev + 1)
  }

  const handleDropdownChange = (e: Event) => {
    const customEvent = e as CustomEvent
    setSelectedValue(customEvent.detail.value)
    console.log('Dropdown changed:', customEvent.detail)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          LZT UI Components in React
        </h1>

        <div className="space-y-8">
          {/* Button Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Button Component
            </h2>
            <p className="text-gray-600 mb-4">
              Clicks: <span className="font-bold">{buttonClicks}</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <lzt-button onClick={handleButtonClick}>
                Default Button
              </lzt-button>
              <lzt-button variant="primary" onClick={handleButtonClick}>
                Primary Button
              </lzt-button>
              <lzt-button variant="secondary" onClick={handleButtonClick}>
                Secondary Button
              </lzt-button>
              <lzt-button variant="danger" onClick={handleButtonClick}>
                Danger Button
              </lzt-button>
              <lzt-button disabled>
                Disabled Button
              </lzt-button>
            </div>
          </section>

          {/* Dropdown Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Dropdown Component
            </h2>
            <p className="text-gray-600 mb-4">
              Selected value:{' '}
              <span className="font-bold">
                {selectedValue || 'None'}
              </span>
            </p>
            <lzt-dropdown
              label="Select an option"
              // @ts-ignore - Custom event type
              onLzt-change={handleDropdownChange}
            >
              <lzt-dropdown-item value="option1">
                Option 1
              </lzt-dropdown-item>
              <lzt-dropdown-item value="option2">
                Option 2
              </lzt-dropdown-item>
              <lzt-dropdown-item value="option3">
                Option 3
              </lzt-dropdown-item>
              <lzt-dropdown-item value="option4">
                Option 4
              </lzt-dropdown-item>
            </lzt-dropdown>
          </section>

          {/* Info Section */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">
              About This Demo
            </h3>
            <p className="text-blue-800">
              This React application uses Web Components built with Lit and styled with Tailwind CSS v4.
              The components are framework-agnostic and can be used in any modern web application.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
