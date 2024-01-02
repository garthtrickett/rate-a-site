import React, { useState } from 'react'
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
import { Label } from '../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'

export default function HeroSearch() {
  const [selectedOption, setSelectedOption] = useState('salon')

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-2">
        <RadioGroup
          defaultValue="salon"
          className="flex space-x-2 mr-2"
          onValueChange={setSelectedOption}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="salon" id="salon" />
            <Label htmlFor="salon-search">Salons</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stylist" id="stylist" />
            <Label htmlFor="stylist">Stylists</Label>
          </div>
        </RadioGroup>
        <Select>
          <SelectTrigger className="mr-2">
            <SelectValue placeholder="Haircut Style" />
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
        <Input className="mr-2" id="subject" placeholder="Name..." />
      </div>
      <Link
        href={`/${selectedOption}-search`}
        className={`w-[10rem] ${cn(buttonVariants({ size: 'lg' }))}`}
      >
        Find a barber
      </Link>
    </div>
  )
}
