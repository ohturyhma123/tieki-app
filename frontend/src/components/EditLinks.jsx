import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/links'

const EditLinks = () => {
  const [links, setLinks] = useState([])

  /**
   * Fetch links from the backend when the component is mounted.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setLinks(response.data)
      } catch (error) {
        error
      }
    }

    fetchData()
  }, [])

  /**
    * Update the name of the link with the given id.
   */
  const handleNameChange = (id, newName) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, name: newName } : link))
    setLinks(updatedLinks)
  }

  /**
    * Update the description of the link with the given id.
   */
  const handleDescriptionChange = (id, newDescription) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, description: newDescription } : link
    )
    setLinks(updatedLinks)
  }

  /**
    * Update the url of the link with the given id.
   */
  const handleUrlChange = (id, newUrl) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, url: newUrl } : link))
    setLinks(updatedLinks)
  }

  /**
   * Save the updated links to the backend.
    */

  const handleSaveClick = async () => {
    try {
      // Update links on the backend
      await axios.put(baseUrl, links, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      error
    }
  }

  return (
    <div>
      <h1>Muokkaa linkkejä</h1>
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
      <button onClick={handleSaveClick}>Tallenna</button>
    </div>
  )
}

export default EditLinks
