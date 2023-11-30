import React from 'react'

/**
 * `HeadingText` component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed as the main heading.
 * @param {string} props.subtext - The content to be displayed as the subheading.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 */
export default function HeadingText({ children, subtext, className }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="text-3xl font-bold text-primary lg:text-4xl">
        {children}
      </h1>
      {subtext && (
        <h2 className="font-light text-muted-foreground lg:text-lg">
          {subtext}
        </h2>
      )}
    </div>
  )
}
