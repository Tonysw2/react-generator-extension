import { useState } from 'react'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Input } from './components/ui/input'
import { brazilAreaCodes } from './const/brazil-area-codes'

export function App() {
  const [inputValue, setInputValue] = useState('')

  function generateBrazilianCellphone() {
    const areaCode =
      brazilAreaCodes[Math.floor(Math.random() * brazilAreaCodes.length)]

    const number = `9${Math.floor(10000000 + Math.random() * 90000000)}`

    setInputValue(`(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`)
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>🚀 DataGenie – Quick Data Generator</CardTitle>
        <CardDescription>
          Instantly generate names, phone numbers, ZIP codes, and more. Perfect
          for developers and testers!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2">
          <Input
            type="text"
            value={inputValue}
            readOnly
          />

          <Button
            type="button"
            onClick={generateBrazilianCellphone}
          >
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
