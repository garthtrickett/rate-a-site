'use client'
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion
} from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import Link from 'next/link'

import { StarRating } from '../../components/ui/star-rating'
export default function SalonSearchResults({ data }) {
  return (
    <section className="container px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start">
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
      <div className="grid gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Hair Salons</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Find the perfect salon for your next haircut.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {data.map(salon => (
            <div key={salon.id} className="relative group">
              <Link
                className="absolute inset-0 z-10"
                href={`/salon/${salon.id}`}
              >
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Salon image"
                className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                height={200}
                src="/placeholder.svg"
                width={200}
              />
              <div className="flex-1 py-4">
                <h3 className="font-semibold tracking-tight">{salon.name}</h3>
                <small className="text-sm leading-none text-gray-500 dark:text-gray-400">
                  {salon.address} {/* Replace with actual address field */}
                </small>
                <div className="flex items-center gap-0.5 mt-2">
                  {/* Replace with actual rating */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
