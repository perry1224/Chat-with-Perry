const App = () => {

const getMessages = async() => {
  const options = {
    method: "POST",
    body : JSON.stringify( {
      message: "hello there"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const response = await fetch('http://localhost:8000/completions', options)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

return (
  <div className="app">
    <section className="side-bar">
      <button>+ New Chat</button>
      <ul className="history">
          <li>Hello</li>
      </ul>
        <nav>
      
          <p>Made by Perry</p>
        </nav>
   
    </section>

    <section className="main">
      <h1>Chat with Perry</h1>
      <ul className="feed">
      </ul>

      <div className="bottom-section">
        <div className="input-container">
          <input/>
          <div id="submit" onClick={getMessages}>➢</div>
        </div>
        <p className="info"> Testing</p>
      </div>
    </section>
  </div>
)
}

export default App;
