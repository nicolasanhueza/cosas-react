import { useState, useEffect, useRef } from 'react'

export function useSearch () {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }

      if (search === '') {
        setError('No se puede buscar una película sin un título')
        return
      }
  
      if (search.length < 3) {
        setError('El título de la película debe tener al menos 3 caracteres')
        return
      }
  
      if (search.match(/^a-zA-Z0-9 ]/)) {
        setError('El título de la película solo puede contener letras y números')
        return
      }
      setError(null)
    }, [search])
  
    return { search, updateSearch, error }
  }