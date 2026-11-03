"use client"

import i18n from "@/i18n.config"
import { ReactNode, useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"

/**
 * 다국어 제공 Provider
 */
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
