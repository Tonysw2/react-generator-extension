import { storageKeys } from '@/const/storage-keys'
import { cn } from '@/lib/utils'
import { PhoneGenerator, type PhoneStyle } from '@/services/phone-generator'
import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'
import { StateCombobox } from './combobox'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { TabsContent } from './ui/tabs'

export function PhoneTab() {
  const [state, setState] = useState('')
  const [cellphone, setCellphone] = useState(() => {
    const storedData = localStorage.getItem(storageKeys.phone)

    return storedData ? storedData : ''
  })
  const [copiedSuccessfully, setCopiedSuccessfully] = useState(false)

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  function generateBrazilianCellphone(style: PhoneStyle) {
    return () => {
      setCopiedSuccessfully(false)

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }

      const generatedPhone = PhoneGenerator.generate({ state, style })

      setCellphone(generatedPhone)

      localStorage.setItem(storageKeys.phone, generatedPhone)
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
        <StateCombobox
          state={state}
          onStateChange={setState}
        />

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
            className="group -translate-y-1/2 absolute top-1/2 right-3 transition-all duration-300 hover:disabled:scale-1 [&:not(:disabled)]:hover:scale-125"
          >
            <Check
              className={cn(
                'size-4 stroke-green-500',
                copiedSuccessfully ? 'block' : 'hidden',
              )}
            />
            <Copy
              className={cn(
                'size-4 stroke-foreground transition-colors group-disabled:stroke-muted',
                !copiedSuccessfully ? 'block' : 'hidden',
              )}
            />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={generateBrazilianCellphone('national')}
          >
            Nacional
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={generateBrazilianCellphone('international')}
          >
            Internacional
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={generateBrazilianCellphone('raw')}
          >
            Sem máscara
          </Button>
        </div>
      </div>
    </TabsContent>
  )
}
