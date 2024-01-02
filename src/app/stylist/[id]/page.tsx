'use client'
import { useStore } from '../../../store'
import { db } from '../../../drizzle/index'
import { eq } from 'drizzle-orm'

const Stylist = ({ params }) => {
  const { id } = params

  // Get the professionals from the store
  const { professionals } = useStore()

  // Try to find the professional in the store
  let professional = professionals.find(prof => prof.id === id)

  return <ProfessionalDetails professional={professional} id={id} />
}

export default Stylist

// Move this into its own file thats a server component
const ProfessionalDetails = async ({ professional, id }) => {
  // If the professional is not in the store, fetch it from the database
  if (!professional) {
    const professionals = await db.query.professionals.findMany({
      where: (professionals, { eq }) => eq(professionals.id, id)
    })
    // Assuming that findMany returns an array, get the first item
    professional = professionals[0]
  }

  console.log(professional)
  return <p>Stylist {professional.id}</p>
}
