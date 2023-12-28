import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '../../components/ui/select'
import { Input } from '../../components/ui/input'

export default function HeroSearch() {
  return (
    <div className="flex items-center">
      <Select>
        <SelectTrigger className="mr-2">
          <SelectValue placeholder="Select a cut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="team">Sick fade</SelectItem>
          <SelectItem value="billing">Brocolli cut</SelectItem>
          <SelectItem value="account">Man-bun</SelectItem>
          <SelectItem value="deployments">Ceaser cut</SelectItem>
          <SelectItem value="support">French crop</SelectItem>
        </SelectContent>
      </Select>
      <Input className="mr-2" id="subject" placeholder="City name..." />
      <Input className="mr-2" id="subject" placeholder="Barber name..." />
      <Link
        href="https://google.com/"
        target="_blank"
        className={`w-[10rem] ${cn(buttonVariants({ size: 'lg' }))}`}
      >
        Find a barber
      </Link>
    </div>
  )
}
