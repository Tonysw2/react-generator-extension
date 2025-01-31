import { fakerPT_BR as faker } from '@faker-js/faker'
import { Cog, Copy } from 'lucide-react'
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
import { Label } from './components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'

type TabsOptions = 'person' | 'address'

export function App() {
  const [activeTab, setActiveTab] = useState<TabsOptions>('person')
  const [cellphone, setCellphone] = useState('')

  function handleGenerateCellphone() {
    const formattedNumber = faker.phone
      .number({ style: 'national' })
      .replace(/(?<=\(\d{2}\)\s)(\d{4,5})(?=-)/g, (match) =>
        match.length === 4 ? `9${match}` : `9${match.slice(1)}`,
      )
    setCellphone(formattedNumber)
  }

  function handleCopyGeneratedCellphone() {
    navigator.clipboard.writeText(cellphone)
  }

  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle>🚀 DataGenie – Quick Data Generator</CardTitle>
        <CardDescription>
          Instantly generate names, phone numbers, ZIP codes, and more. Perfect
          for developers and testers!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          className="w-full"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabsOptions)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="person">Person</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>

          <TabsContent value="person">
            <div className="mt-5 grid grid-cols-[1fr_min-content_min-content] items-end gap-2">
              <div className="grid gap-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  readOnly
                  id="phone"
                  type="text"
                  value={cellphone}
                />
              </div>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleGenerateCellphone}
                    >
                      <Cog className="size-4" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="border bg-background">
                    <p>Generate</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      onClick={handleCopyGeneratedCellphone}
                    >
                      <Copy className="size-4" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="border bg-background">
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
