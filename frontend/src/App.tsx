import "react";
import { OracleFlowEditor } from './components'

import './App.css'
import '@xyflow/react/dist/style.css';

function App() {
  return (
    <>
      <header>
        <h1>Oracle Flow Editor</h1>
      </header>
      <main>
        <OracleFlowEditor />
      </main>
    </>
  )
}

export default App
