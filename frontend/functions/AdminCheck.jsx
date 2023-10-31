import { useState, useEffect } from 'react'
import axios from 'axios'

const AdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get('/api/login')
        setIsAdmin(response.data.isAdmin)
      } catch (error) {
        setIsAdmin(false)
      }
    }

    fetchAdminStatus()
  }, [])

  return isAdmin
}

export default AdminCheck
