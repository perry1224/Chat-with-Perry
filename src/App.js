const App = () => {
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
          <div id="submit">➢</div>
        </div>
        <p className="info"> Testing</p>
      </div>
    </section>
  </div>
)
}

export default App;
