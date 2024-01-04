import { db } from '../../../drizzle/index'
import { eq } from 'drizzle-orm'
import { StarRating } from '../../../components/ui/star-rating'

const SalonDetail = async ({ params }) => {
  const { id } = params
  console.log('id', id)

  const organisations = await db.query.organisations.findMany({
    where: (organisations, { eq }) => eq(organisations.id, id),
    with: {
      professionalOrganisationMappings: {
        with: {
          professional: true
        }
      },
      organisationReviews: {
        with: {
          commonReviewFields: true,
          customer: true
        }
      }
    }
  })

  const organisation = organisations[0]
  console.log(organisation.organisationReviews)

  const calculateAverageRating = reviews => {
    if (!reviews.length) return 0

    const total = reviews.reduce(
      (sum, review) => sum + review.commonReviewFields.rating,
      0
    )
    return Number((total / reviews.length).toFixed(1)) // Convert the result back to a number
  }

  const averageRating = calculateAverageRating(organisation.organisationReviews)

  return (
    <>
      <div key="1" className="w-full px-4 py-6 md:px-8 md:py-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/3">
            <img
              alt="Salon Image"
              className="aspect-square object-cover rounded-lg"
              height="300"
              src="/placeholder.svg"
              width="300"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <h1 className="text-3xl font-bold"> {organisation.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              A professional salon with over 10 years of experience in the
              industry. Known for its attention to detail and ability to create
              unique, personalized styles for its clients.
            </p>
            <div className="flex items-center gap-1">
              <StarRating rating={averageRating} />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Specialties: Men's Haircuts, Women's Haircuts, Styling
            </p>
          </div>
        </div>
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="space-y-4">
            {organisation.organisationReviews.map(review => (
              <div key={review.id} className="border rounded-lg p-4">
                <h3 className="font-bold">{review.customer?.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={review.commonReviewFields?.rating} />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {review.commonReviewFields?.comments}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default SalonDetail
