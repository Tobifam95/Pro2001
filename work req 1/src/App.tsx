import { useEffect, useState } from 'react'
import './App.css'

type FunFact = {
  text: string
}

function App() {

  const [currentFact, setCurrentFact] = useState<FunFact | null>(null)

  useEffect(() => {
    let interval: number

    fetch('/funfacts.json')
      .then(res => res.json())
      .then(data => {
        const facts: FunFact[] = data.funFacts
        setCurrentFact(randomFact(facts))
        interval = window.setInterval(() => {
          setCurrentFact(randomFact(facts))
        }, 2000)
      })

    return () => clearInterval(interval)
  }, [])


  function randomFact(facts: FunFact[]) {
    const index = Math.floor(Math.random() * facts.length)
    return facts[index]
  }

  return (
    <div>
      <h1>Introducing Yourself - Random Fun Fact</h1>
      <h2>Hello, I'm Tobias!</h2>
      <p>{currentFact?.text || 'Loading...'}</p>
    </div>
  )
}

export default App