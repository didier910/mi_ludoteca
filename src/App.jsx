import './App.css'
import { Header } from './header/Header'
import { MenuRouter } from './router/MenuRouter'

function App() {

  return (
    <>
      <Header />
      <div className="app-content">
        <MenuRouter />
      </div>
    </>
  )
}

export default App