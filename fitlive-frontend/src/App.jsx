import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Gyms from './components/Gyms.jsx'
import Partners from './components/Partners.jsx'
import Footer from './components/Footer.jsx'
import FloatingButton from './components/FloatingButton.jsx'
import JoinModal from './components/JoinModal.jsx'

export default function App() {
  const [joinOpen, setJoinOpen] = useState(false)
  const openJoin = useCallback(() => setJoinOpen(true), [])
  const closeJoin = useCallback(() => setJoinOpen(false), [])

  return (
    <>
      <Navbar onJoin={openJoin} />
      <main>
        <Hero onJoin={openJoin} />
        <About />
        <Gyms />
        <Partners />
      </main>
      <Footer />
      <FloatingButton onClick={openJoin} hidden={joinOpen} />
      <JoinModal open={joinOpen} onClose={closeJoin} />
    </>
  )
}
