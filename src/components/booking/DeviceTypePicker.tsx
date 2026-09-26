import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { DEVICE_TYPES } from '@/data/booking'
import { bookingUrl } from '@/lib/booking-url'

interface DeviceTypePickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeviceTypePicker({ open, onOpenChange }: DeviceTypePickerProps) {
  const navigate = useNavigate()

  const select = (deviceId: string) => {
    onOpenChange(false)
    navigate(bookingUrl({ device: deviceId }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-white/10 bg-[#071224] p-0">
        <div className="px-6 py-8 pr-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#59d8ff] uppercase">Book Repair</p>
          <h2 className="mt-2 text-2xl font-bold text-white">What would you like to repair?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {DEVICE_TYPES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => select(d.id)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition-all hover:border-[#59d8ff]/40 hover:bg-[#59d8ff]/[0.08] hover:shadow-[0_0_24px_rgba(89,216,255,0.15)]"
              >
                <span className="text-2xl" aria-hidden>
                  {d.emoji}
                </span>
                <span className="font-semibold text-white">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
