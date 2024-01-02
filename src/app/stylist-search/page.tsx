// app/search/page.tsx
import SearchResults from '../../components/pages/search-results'
import { db } from '../../drizzle/index'

const SearchPage = async () => {
  const results = await db.query.professionals.findMany()
  console.log(results)

  return (
    <>
      <SearchResults data={results} />
    </>
  )
}

export default SearchPage
