import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagneticButton } from '@/components/layout/MagneticButton'
import { DeviceTypePicker } from './DeviceTypePicker'
import { Button, type ButtonProps } from '@/components/ui/button'
import type { ComponentProps } from 'react'

type BookRepairButtonProps = Omit<ComponentProps<typeof MagneticButton>, 'to'> & {
  /** Skip device picker when linking from services/brands with params */
  directToBooking?: boolean
}

/** Opens device-type picker, then navigates to unified booking form */
export function BookRepairButton({
  directToBooking = false,
  onClick,
  children = 'Book Repair',
  ...props
}: BookRepairButtonProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (directToBooking) {
      navigate('/booking')
      return
    }
    setPickerOpen(true)
  }

  return (
    <>
      <MagneticButton {...props} onClick={handleClick}>
        {children}
      </MagneticButton>
      <DeviceTypePicker open={pickerOpen} onOpenChange={setPickerOpen} />
    </>
  )
}

/** Plain Button variant for navbar */
export function BookRepairNavButton({
  className,
  children = 'Book Repair',
  ...props
}: ButtonProps) {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <>
      <Button className={className} onClick={() => setPickerOpen(true)} {...props}>
        {children}
      </Button>
      <DeviceTypePicker open={pickerOpen} onOpenChange={setPickerOpen} />
    </>
  )
}
