import SalonSearchResults from '../../components/pages/salon-search-results'
import { db } from '../../drizzle/index'

const SalonSearchPage = async () => {
  const results = await db.query.organisations.findMany()

  return (
    <>
      <SalonSearchResults data={results} />
    </>
  )
}

export default SalonSearchPage
