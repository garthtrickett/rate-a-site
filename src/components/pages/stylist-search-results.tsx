'use client'
import { Button } from '../ui/button'
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion
} from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import Link from 'next/link'
import { CardHeader, CardContent, CardFooter, Card } from '../ui/card'
import { AvatarImage, AvatarFallback, Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { placeholder } from '../../config/contents'
import { useStore } from '../../store'
import React, { useEffect } from 'react'

export default function StylistSearchResults({ data }) {
  return (
    <main className="container mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[240px_1fr] gap-10">
      <div className="flex flex-col gap-4 items-start py-2">
        <div className="grid gap-1">
          <h2 className="font-semibold text-lg">Filter Results</h2>
        </div>
        <Accordion
          className="w-full"
          type="multiple"
          defaultValue={['location', 'services', 'price']}
        >
          <AccordionItem value="location" defaultOpen>
            <AccordionTrigger className="text-base">Location</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="location-downtown" />
                  Downtown
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="location-suburbs" />
                  Suburbs
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="location-rural" />
                  Rural
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="services" defaultOpen>
            <AccordionTrigger className="text-base">Services</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="services-haircut" />
                  Haircut
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="services-coloring" />
                  Coloring
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="services-styling" />
                  Styling
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price" defaultOpen>
            <AccordionTrigger className="text-base">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-low" />$ - Low
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-medium" />
                  $$ - Medium
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-high" />
                  $$$ - High
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <section className="grid gap-6 md:gap-8 grid-cols-3">
        {data.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <Link className="font-semibold text-lg" href="#">
                {item.name}
              </Link>
            </CardHeader>
            <CardContent>
              <img
                className="mb-4" // Add bottom margin to the image
                alt="Stylist's Work"
                className="w-full h-auto"
                height="128"
                src="/placeholder.svg"
                style={{
                  aspectRatio: '128/128',
                  objectFit: 'cover',
                  borderRadius: '10%'
                }}
                width="128"
              />
              <p className="mt-6 text-gray-500">
                {' '}
                {/* Add top margin to the paragraph */}
                Specializes in curly hair and color treatments.
              </p>
              <Badge>4.5 ☆</Badge>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={`/stylist/${item.id}`}>
                <Button variant="outline">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  )
}
