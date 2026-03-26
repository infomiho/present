import { render } from 'preact'
import { Deck } from './components'
import { slides } from './slides'
import './styles.css'

function App() {
  return <Deck>{slides}</Deck>
}

render(<App />, document.getElementById('app')!)
