import { useState, useEffect } from 'react'
import axios from 'axios'

const EditLinks = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/links') // Replace with your API endpoint
        setLinks(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])


  const handleNameChange = (id, newName) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, name: newName } : link))
    setLinks(updatedLinks)
  }

  const handleDescriptionChange = (id, newDescription) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, description: newDescription } : link
    )
    setLinks(updatedLinks)
  }

  const handleUrlChange = (id, newUrl) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, url: newUrl } : link))
    setLinks(updatedLinks)
  }

  const handleSaveClick = async () => {
    try {
      // Update links on the backend
      await axios.put('http://localhost:3001/api/links', links, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Links updated successfully')
    } catch (error) {
      console.error('Error updating links:', error)
    }
  }

  return (
    <div>
      <h1>Edit Links</h1>
      {links.map((link) => (
        <div key={link.id}>
          <input
            type="text"
            value={link.name}
            onChange={(e) => handleNameChange(link.id, e.target.value)}
          />
          <input
            type="text"
            value={link.description}
            onChange={(e) => handleDescriptionChange(link.id, e.target.value)}
          />
          <input
            type="text"
            value={link.url}
            onChange={(e) => handleUrlChange(link.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSaveClick}>Save</button>
    </div>
  )
}

export default EditLinks
