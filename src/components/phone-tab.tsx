import { mappedBrazilAreaCodes } from '@/const/brazil-area-codes'
import { brazilStates } from '@/const/brazil-states'
import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { TabsContent } from './ui/tabs'

export function PhoneTab() {
  const [state, setState] = useState<string>()
  const [cellphone, setCellphone] = useState('')
  const [copiedSuccessfully, setCopiedSuccessfully] = useState(false)

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  function generateBrazilianCellphone(formatted = true) {
    return () => {
      setCopiedSuccessfully(false)

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }

      const areaCodes =
        mappedBrazilAreaCodes.get(state ?? '') ??
        Array.from(mappedBrazilAreaCodes.values()).flat()

      const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)]

      const number = `9${Math.floor(10000000 + Math.random() * 90000000)}`

      setCellphone(
        formatted
          ? `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`
          : `${areaCode}${number}`,
      )
    }
  }

  function handleCopyGeneratedCellphone() {
    if (cellphone.length <= 0) return

    navigator.clipboard.writeText(cellphone)
    setCopiedSuccessfully(true)

    const timeoutId = setTimeout(() => {
      setCopiedSuccessfully(false)
      timeoutIdRef.current = null
    }, 3000)

    timeoutIdRef.current = timeoutId
  }

  return (
    <TabsContent value="phone">
      <div className="mt-5 grid gap-2">
        <Select
          value={state}
          onValueChange={setState}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="State" />
          </SelectTrigger>

          <SelectContent>
            {brazilStates.map((item) => (
              <SelectItem
                key={item.symbol}
                value={item.symbol}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Input
            readOnly
            id="phone"
            type="text"
            value={cellphone}
          />
          <button
            type="button"
            disabled={cellphone.length === 0}
            onClick={handleCopyGeneratedCellphone}
            className="-translate-y-1/2 absolute top-1/2 right-3 transition-all hover:disabled:scale-1 [&:not(:disabled)]:hover:scale-125"
          >
            {copiedSuccessfully ? (
              <Check className="size-4 stroke-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={generateBrazilianCellphone()}
          >
            Generate formatted
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={generateBrazilianCellphone(false)}
          >
            Generate raw
          </Button>
        </div>
      </div>
    </TabsContent>
  )
}
