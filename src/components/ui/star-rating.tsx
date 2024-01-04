const HalfStarIcon = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // Change fill to "currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  )
}

const FullStarIcon = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // Change fill to "currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const EmptyStarIcon = props => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none" // Keep fill as "none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const halfStars = rating % 1 !== 0 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <FullStarIcon key={i} className="w-5 h-5 fill-primary" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <HalfStarIcon key={i} className="w-5 h-5 fill-primary" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <EmptyStarIcon
          key={i}
          className="w-5 h-5 fill-muted stroke-muted-foreground"
        />
      ))}
      <span className="ml-2 text-lg font-semibold">{rating}</span>
    </div>
  )
}
