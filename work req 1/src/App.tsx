import { useEffect, useState } from 'react'
/* ^Importerer hooks fra react sitt bibliotek 
for å håndtere state og sideeffekter (state vil si intern data som håndterer UI rendering,
 side effects er for eksterne
 handlinger som API-kall eller timers)
 */
import './App.css' // Importerer stilen for App-komponenten fra en CSS-fil

type FunFact = { // <-Definerer en TypeScript-type for et fun fact-objekt som finnes i JSON-filen
  text: string // <-En fun fact består av en tekststreng som beskriver faktaet
}

function App() { // Kaller på funksjonen til App-komponenten, som er hovedkomponenten i React-appen

  const [currentFact, setCurrentFact] = useState<FunFact | null>(null)
  /* Deklarerer en state-variabel "currentFact" som kan være av typen FunFact eller null,
   og en funksjon "setCurrentFact" for å oppdatere denne variabelen.
    Initialverdien er null, som betyr at ingen fun fact er lastet inn ennå.
  */

  useEffect(() => { /* Kjører kode én gang når komponenten først rendres,
  og setter opp et intervall for å oppdatere fun fact hvert 2. sekund */

    let interval: number // Variabel for å lagre ID til intervallet, slik at det kan ryddes opp senere

    fetch('/funfacts.json') // Henter JSON-fil med fun facts, som ligger i public-mappen
      .then(res => res.json()) // Konvertererer responsen til JSON-format, som gir oss et JavaScript-objekt vi kan jobbe med
      .then(data => { // Når data er mottatt, kjører denne funksjonen med data som argument
        const facts: FunFact[] = data.funFacts
        /* Henter listen med fun facts fra data-objektet,
        og forteller TypeScript at det er en array av FunFact-objekter*/

        setCurrentFact(randomFact(facts)) // Gir oss et tilfeldig fun fact umiddelbart når data er lastet inn
        interval = window.setInterval(() => { // Starter et intervall som kjører annenhvert sekund
          setCurrentFact(randomFact(facts)) // Oppdaterer state med et nytt tilfeldig fun fact
        }, 2000) // 2000 ms = 2 sekunder
      })

    return () => clearInterval(interval) // Rydder opp intervallet når komponenten avmonteres, for å unngå at intervallet fortsetter å kjøre i bakgrunnen
  }, []) // Tom dependency array gjør at useEffect kun kjøres én gang


  function randomFact(facts: FunFact[]) { // Velger et tilfeldig fun fact fra listen av fun facts
    const index = Math.floor(Math.random() * facts.length) // Genererer et tilfeldig indeksnummer i listen
    return facts[index] // Returnerer fun fact-objektet på den indeksen
  }

  return ( // JSX som bestemmer hva som vises i UI
    <div>
    /* Container for innholdet */
      <h1>Introducing Yourself - Random Fun Fact</h1> {/* Hovedoverskrift */}
      <h2>Hello, I'm Reza!</h2> {/* Underoverskrift */}
      <p>{currentFact?.text || 'Loading...'}</p> {/* Viser teksten til fun fact, eller "Loading..." hvis data ikke er klar */}
    </div>
  )
}

export default App // Eksporterer App-komponenten slik at den kan brukes i andre filer