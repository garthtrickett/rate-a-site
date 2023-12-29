'use client'
import { useStore } from '../store'

const ClientComponent: React.FC = () => {
  const { data } = useStore(state => state)
  return <div>{data}</div>
}

export default ClientComponent
