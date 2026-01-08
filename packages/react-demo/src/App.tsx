import { useState } from 'react'
import {
  TailwindButton,
  TailwindDropdown,
  TailwindDropdownItem
} from '@lzt/lit-components/react'

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
              <TailwindButton onButtonClick={handleButtonClick}>
                Default Button
              </TailwindButton>
              <TailwindButton variant="primary" onButtonClick={handleButtonClick}>
                Primary Button
              </TailwindButton>
              <TailwindButton variant="secondary" onButtonClick={handleButtonClick}>
                Secondary Button
              </TailwindButton>
              <TailwindButton variant="danger" onButtonClick={handleButtonClick}>
                Danger Button
              </TailwindButton>
              <TailwindButton disabled>
                Disabled Button
              </TailwindButton>
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
            <TailwindDropdown
              label="Select an option"
              onChange={handleDropdownChange}
            >
              <TailwindDropdownItem value="option1">
                Option 1
              </TailwindDropdownItem>
              <TailwindDropdownItem value="option2">
                Option 2
              </TailwindDropdownItem>
              <TailwindDropdownItem value="option3">
                Option 3
              </TailwindDropdownItem>
              <TailwindDropdownItem value="option4">
                Option 4
              </TailwindDropdownItem>
            </TailwindDropdown>
          </section>

          {/* Info Section */}
          <section className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">
              About This Demo
            </h3>
            <p className="text-blue-800">
              This React application uses React-wrapped components built with Lit and styled with Tailwind CSS v4.
              The components provide proper TypeScript types and React-friendly event handling.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
