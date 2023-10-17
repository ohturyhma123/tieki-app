const splitLongStrings = (arr, maxLength) => {
  return arr.map((str) => {
    if (str.length <= maxLength) {
      return [str] //**If the string is shorter than or equal to maxLength, no splitting needed */
    }
    const chunks = []
    let start = 0
    while (start < str.length) {
      let end = start + maxLength

      //**Adjust the end index to the last space within the maxLength */
      while (end > start && str[end] !== ' ' && str[end] !== undefined) {
        end--
      }

      const chunk = str.substring(start, end).trim()
      if (chunk.length > 0) {
        chunks.push(chunk)
      }
      start = end + 1 //** Move start to the next character after the space */
    }

    return chunks
  })
}

export default splitLongStrings