// app/search/page.tsx
import StylistSearchResults from '../../components/pages/stylist-search-results'
import { db } from '../../drizzle/index'

const StylistSearchPage = async () => {
  const results = await db.query.professionals.findMany()

  return (
    <>
      <StylistSearchResults data={results} />
    </>
  )
}

export default StylistSearchPage
