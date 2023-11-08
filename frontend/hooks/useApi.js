import { useState, useEffect } from 'react'
import axios from 'axios'

const useApi = (source) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(source)
        if (response.status === 200) {
          setData(response.data)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [source])

  return { data, loading, error }
}

export default useApi
