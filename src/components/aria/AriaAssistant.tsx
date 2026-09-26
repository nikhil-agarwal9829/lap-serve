import { AriaChatDrawer } from './AriaChatDrawer'
import { AriaFloatingButton } from './AriaFloatingButton'

/** Right-side drawer + post-hero floating trigger only (no left-side widget) */
export function AriaAssistant() {
  return (
    <>
      <AriaFloatingButton />
      <AriaChatDrawer />
    </>
  )
}
