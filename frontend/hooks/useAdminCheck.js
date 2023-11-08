import { useState, useEffect } from 'react'
import axios from 'axios'

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get('/api/login')
        if (response.status === 200) {
          setIsAdmin(response.data.isAdmin)
        }
      } catch (error) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }

    fetchAdminStatus()
  }, [])

  return { isAdmin, loading, error }
}

export default useAdminCheck
