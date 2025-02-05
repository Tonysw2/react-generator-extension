import { storageKeys } from '@/const/storage-keys'
import { cn } from '@/lib/utils'
import { AddressGenerator } from '@/services/address-generator'
import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useRef, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { TabsContent } from './ui/tabs'

export function AddressTab() {
  const [copiedSuccessfully, setCopiedSuccessfully] = useState({
    zipCode: false,
    street: false,
    number: false,
    city: false,
    state: false,
  })
  const [address, setAddress] = useState<{
    zipCode: string
    street: string
    number: string
    city: string
    state: string
  }>(() => {
    const storedData = localStorage.getItem(storageKeys.address)

    return storedData
      ? JSON.parse(storedData)
      : {
          zipCode: '',
          street: '',
          number: '',
          city: '',
          state: '',
        }
  })

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  function generateAddress() {
    setCopiedSuccessfully({
      zipCode: false,
      street: false,
      number: false,
      city: false,
      state: false,
    })

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }

    const generatedAddress = AddressGenerator.generate()

    setAddress(generatedAddress)

    localStorage.setItem(storageKeys.address, JSON.stringify(generatedAddress))
  }

  async function handleCopyToClipboard(
    key: keyof typeof address,
    value: string,
  ) {
    await navigator.clipboard.writeText(value)
    setCopiedSuccessfully((state) => ({ ...state, [key]: true }))

    const timeoutId = setTimeout(() => {
      setCopiedSuccessfully((state) => ({ ...state, [key]: false }))
    }, 3000)

    timeoutIdRef.current = timeoutId
  }

  function getLabel(key: string) {
    switch (key) {
      case 'city': {
        return 'Cidade'
      }

      case 'number': {
        return 'Número'
      }

      case 'state': {
        return 'Estado'
      }

      case 'street': {
        return 'Rua'
      }

      case 'zipCode': {
        return 'CEP'
      }

      default: {
        return ''
      }
    }
  }

  function getCustomStyles(key: string) {
    switch (key) {
      case 'city': {
        return 'col-span-2 row-start-3 col-start-1'
      }

      case 'number': {
        return 'col-span-1 row-start-2'
      }

      case 'state': {
        return 'col-span-1 row-start-3'
      }

      case 'street': {
        return 'col-span-3 row-start-2'
      }

      case 'zipCode': {
        return 'col-span-2 row-start-1'
      }

      default: {
        return 'col-span-2'
      }
    }
  }

  return (
    <TabsContent
      value="address"
      className="space-y-4"
    >
      <Alert className="border-amber-500">
        <TriangleAlert className="size-4 stroke-amber-500" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          O endereço gerado não é válido no Brasil. Ele é apenas ilustrativo,
          mas planejamos adicionar endereços reais futuramente.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-4 gap-2">
        {Object.entries(address).map(([key, value]) => {
          const typedKey = key as keyof typeof address

          return (
            <div
              key={key}
              className={getCustomStyles(key)}
            >
              <Label htmlFor={value}>{getLabel(key)}</Label>
              <div className="relative">
                <Input
                  readOnly
                  id={value}
                  type="text"
                  value={value}
                />
                <button
                  type="button"
                  disabled={value.length === 0}
                  className="group -translate-y-1/2 absolute top-1/2 right-3 transition-all duration-300 hover:disabled:scale-1 [&:not(:disabled)]:hover:scale-125"
                  onClick={() => handleCopyToClipboard(typedKey, value)}
                >
                  <Check
                    className={cn(
                      'size-4 stroke-green-500',
                      copiedSuccessfully[typedKey] ? 'block' : 'hidden',
                    )}
                  />
                  <Copy
                    className={cn(
                      'size-4 stroke-foreground transition-colors group-disabled:stroke-muted',
                      copiedSuccessfully[typedKey] ? 'hidden' : 'block',
                    )}
                  />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        type="button"
        className="mt-4 w-full"
        onClick={generateAddress}
      >
        Gerar endereço
      </Button>
    </TabsContent>
  )
}
