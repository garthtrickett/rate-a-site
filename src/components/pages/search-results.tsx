'use client'
import { Button } from '../ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { CardHeader, CardContent, CardFooter, Card } from '../ui/card'
import { AvatarImage, AvatarFallback, Avatar } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { placeholder } from '../../config/contents'
import { useStore } from '../../store'
import React, { useEffect } from 'react'

export default function SearchResults({ data }) {
  // Get the setProfessionals action from the store
  const {
    professionals,
    actions: { setProfessionals }
  } = useStore()

  useEffect(() => {
    // Use the setProfessionals action to update the professionals in the store
    setProfessionals(data)
  }, [data]) // Only call setProfessionals when data changes

  return (
    <main className="container mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[240px_1fr] gap-10">
      <aside className="flex flex-col gap-4 items-start py-2">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto shrink-0" variant="outline">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="featured">
                <DropdownMenuRadioItem value="featured">
                  Featured
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">
                  Rating: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">
                  Rating: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
      <section className="grid gap-6 md:gap-8 grid-cols-3">
        {professionals.map(item => (
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
