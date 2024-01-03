import { db } from '../../../drizzle/index'
import { eq } from 'drizzle-orm'

const Stylist = async ({ params }) => {
  const { id } = params
  console.log('id', id)

  const professionals = await db.query.professionals.findMany({
    where: (professionals, { eq }) => eq(professionals.id, id),
    with: {
      professionalOrganisationMappings: true,
      professionalReviews: true
    }
  })

  // Assuming that findMany returns an array, get the first item
  const professional = professionals[0]
  console.log(professional.professionalOrganisationMappings)

  return <ProfessionalDetails professional={professional} id={id} />
}

export default Stylist

// Move this into its own file thats a server component
const ProfessionalDetails = ({ professional, id }) => {
  // If the professional is not in the store, fetch it from the database

  return <p>Stylist {professional.id}</p>
}
