import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle2, Circle } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const STATUSES = [
  { id: 'received', label: 'Request Received', desc: 'Your booking has been confirmed.' },
  { id: 'assigned', label: 'Engineer Assigned', desc: 'Certified engineer matched to your case.' },
  { id: 'parts', label: 'Parts Ordered', desc: 'OEM parts sourced if required.' },
  { id: 'progress', label: 'Repair In Progress', desc: 'Repair happening at your location.' },
  { id: 'completed', label: 'Completed', desc: 'Device tested and quality checked.' },
  { id: 'delivered', label: 'Delivered', desc: 'Warranty activated. Case closed.' },
]

export function TrackRepairPage() {
  const [phone, setPhone] = useState('')
  const [ticket, setTicket] = useState('')
  const [tracked, setTracked] = useState(false)
  const [activeStep, setActiveStep] = useState(3)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone && ticket) {
      setTracked(true)
      setActiveStep(3)
    }
  }

  return (
    <>
      <SEO
        title="Track Repair"
        description="Track your LapServe repair status with phone number and ticket ID."
        path="/track"
      />
      <section className="section-gap section-dark pt-28">
        <div className="container-lapserve max-w-2xl">
          <SectionHeading
            align="left"
            title="Track your repair"
            description="Enter your phone number and ticket ID to see real-time status."
          />

          <form onSubmit={handleTrack} className="card-dark p-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="ticket">Ticket Number</Label>
                <Input
                  id="ticket"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                  placeholder="e.g. LS-2026-10482"
                  required
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Track Status
              </Button>
            </div>
          </form>

          {tracked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <p className="mb-6 text-sm text-muted">
                Ticket <span className="font-mono text-primary">{ticket}</span> · {phone}
              </p>
              <div className="relative space-y-0">
                {STATUSES.map((status, i) => {
                  const done = i <= activeStep
                  const current = i === activeStep
                  return (
                    <div key={status.id} className="relative flex gap-6 pb-10 last:pb-0">
                      {i < STATUSES.length - 1 && (
                        <div
                          className={`absolute top-10 left-5 w-0.5 h-[calc(100%-2.5rem)] ${
                            done ? 'bg-primary' : 'bg-white/10'
                          }`}
                        />
                      )}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                          done
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-white/20 bg-elevated text-muted'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      <div className={`pt-1 ${current ? 'opacity-100' : done ? 'opacity-80' : 'opacity-50'}`}>
                        <p className={`font-semibold ${current ? 'text-primary' : ''}`}>{status.label}</p>
                        <p className="mt-1 text-sm text-muted">{status.desc}</p>
                        {current && (
                          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            Current status
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
