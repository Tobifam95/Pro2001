import { useEffect, useState } from 'react' // Importerer React hooks for state og side-effekter
import './App.css' // Importerer CSS-styling for komponenten

type FunFact = { // Definerer en TypeScript-type for et fun fact-objekt
  text: string // Hvert fun fact-objekt må ha en tekststreng
}

function App() { // Hovedkomponenten i applikasjonen

  const [currentFact, setCurrentFact] = useState<FunFact | null>(null) // State som lagrer nåværende fun fact (eller null før data lastes)

  useEffect(() => { // Kjører kode én gang når komponenten monteres
    let interval: number // Variabel for å lagre ID til intervallet

    fetch('/funfacts.json') // Henter JSON-fil med fun facts fra serveren
      .then(res => res.json()) // Konverterer responsen til JavaScript-objekt
      .then(data => { // Når data er mottatt
        const facts: FunFact[] = data.funFacts // Henter listen med fun facts fra JSON-data
        setCurrentFact(randomFact(facts)) // Setter et tilfeldig fun fact som første verdi
        interval = window.setInterval(() => { // Starter et intervall som kjører hvert 2. sekund
          setCurrentFact(randomFact(facts)) // Oppdaterer state med et nytt tilfeldig fun fact
        }, 2000) // 2000 ms = 2 sekunder
      })

    return () => clearInterval(interval) // Rydder opp intervallet når komponenten fjernes
  }, []) // Tom dependency array gjør at useEffect kun kjøres én gang


  function randomFact(facts: FunFact[]) { // Funksjon som velger et tilfeldig fun fact
    const index = Math.floor(Math.random() * facts.length) // Genererer et tilfeldig indeksnummer i listen
    return facts[index] // Returnerer fun fact-objektet på den indeksen
  }

  return ( // JSX som bestemmer hva som vises i UI
    <div> {/* Container for innholdet */}
      <h1>Introducing Yourself - Random Fun Fact</h1> {/* Hovedoverskrift */}
      <h2>Hello, I'm Reza!</h2> {/* Underoverskrift */}
      <p>{currentFact?.text || 'Loading...'}</p> {/* Viser teksten til fun fact, eller "Loading..." hvis data ikke er klar */}
    </div>
  )
}

export default App // Eksporterer App-komponenten slik at den kan brukes i andre filer