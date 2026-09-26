'use client'

import Script from 'next/script'
import type { ScriptProps } from 'next/script'
import type { ReactElement } from 'react'

import { Button } from '@/components/ui/button'
import type { VetterEmbed } from '@/lib/booking'

type VetterButtonVm = {
  init?: () => void
  status?: boolean
}

const RETRY_MS = 250
const RETRY_LIMIT = 40

let openAttempt = 0

function vetterButtonVm(): VetterButtonVm | null {
  const button = document.querySelector('button.btn-vetter')
  const root = button?.closest('.vetter')
  if (!(root instanceof HTMLElement)) {
    return null
  }

  return (root as HTMLElement & { __vue__?: VetterButtonVm }).__vue__ ?? null
}

function tryOpenVetterBooking(requireReady: boolean): boolean {
  const vm = vetterButtonVm()
  if (typeof vm?.init !== 'function') {
    return false
  }

  if (requireReady && !vm.status) {
    return false
  }

  vm.init()
  return true
}

export function openVetterBooking(): void {
  const attempt = ++openAttempt
  let tries = 0

  const run = () => {
    if (attempt !== openAttempt) {
      return
    }

    if (tryOpenVetterBooking(true)) {
      return
    }

    tries += 1
    if (tries >= RETRY_LIMIT) {
      tryOpenVetterBooking(false)
      return
    }

    window.setTimeout(run, RETRY_MS)
  }

  run()
}

type VetterBookingButtonProps = {
  label: string
  className?: string
  onOpen?: () => void
}

export function VetterBookingButton(props: VetterBookingButtonProps): ReactElement {
  const { label, className, onOpen } = props

  return (
    <Button
      type="button"
      variant="primary"
      className={className}
      onClick={() => {
        onOpen?.()
        openVetterBooking()
      }}
    >
      {label}
    </Button>
  )
}

export function VetterBookingHost(props: VetterEmbed): ReactElement {
  const { scriptSrc, identifier } = props

  return (
    <>
      <div hidden inert aria-hidden="true" data-vetter-host="" style={{ display: 'none' }}>
        <div id="vetter-btn" />
      </div>
      <Script
        {...({
          id: 'vetter-online-book',
          src: scriptSrc,
          strategy: 'afterInteractive',
          identifier,
        } as ScriptProps)}
      />
    </>
  )
}
