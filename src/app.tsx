import { useState } from 'react'
import { PhoneTab } from './components/phone-tab'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'

type TabsOptions = 'phone' | 'address'

export function App() {
  const [activeTab, setActiveTab] = useState<TabsOptions>('phone')

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
            <TabsTrigger value="phone">Celular</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
          </TabsList>

          <PhoneTab />
        </Tabs>
      </CardContent>
    </Card>
  )
}
