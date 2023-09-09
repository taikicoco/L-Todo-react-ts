import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>portfolio</h1>
      </div>
      <h1>taikicoco</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>      
      </div>
      <div>
        <h1>taikicoco</h1>
        <h2>インターン経験</h2>
        <h2>学歴</h2>
        <h2>スキル</h2>
        <h2>products</h2>
      </div>
    </>
  )
}

export default App
