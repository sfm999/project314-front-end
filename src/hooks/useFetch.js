import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Can't use async directly in useEffect so make
    // async inside then call it after
    const fetchData = async () => {

      // Pending data
      setIsPending(true)
      try { // Obtain data      
        const res = await fetch(url)
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()
        // Data obtained
        setIsPending(false)
        setData(json)
        setError(null)
      } catch (err) {
        setIsPending(false)
        setError('Could not fetch the data')
        console.log(err.message)
      }
    }

    fetchData()
    }, [url])

  return { data, isPending, error };
}
