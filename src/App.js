import {useState, useEffect} from 'react'

const App = () => {
  const [value, setValue] = useState("")
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

const createNewChat = () => {
  setMessage(null)
  setValue("")
  setCurrentTitle(null)
}

const handleClick = (uniqueTitle) => {
setCurrentTitle(uniqueTitle)
setMessage(null)
setValue("")
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000/completions';


const getMessages = async() => {
  const options = {
    method: "POST",
    body : JSON.stringify( {
      message: value
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const response = await fetch(`${SERVER_URL}/completions`, options)
    const data = await response.json()
    
    setMessage(data.choices[0].message)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
console.log(currentTitle, message)
  //if no new title but there's value in input and message came back, set current title to current value
if (!currentTitle && value && message) {
  setCurrentTitle(value)
}
if (currentTitle && value && message) {
  setPreviousChats(prevChats => (
    [...prevChats, 
      { //response from user
          title: currentTitle,
          role: "user",
          content: value
      },
      { //response from AI
        title: currentTitle,  
        role: message.role,
        content: message.content
      }
  ]
  ))
}
}, [message, currentTitle])

console.log(previousChats)


const currentChat = previousChats.filter(previousChat => previousChat.title===currentTitle)
const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    getMessages()
  }
}

return (
  <div className="app">
    <section className="side-bar">
      <button onClick={createNewChat}>+ New Chat</button>
      <ul className="history">
         {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() =>handleClick(uniqueTitle)}>{uniqueTitle}</li>)} 
      </ul>
        <nav>
      
          <p>Made by Perry</p>
        </nav>
   
    </section>

    <section className="main">
      {!currentTitle && <h1>Chat with Perry</h1>}
      <ul className="feed">
    {currentChat?.map((chatMessage, index) => <li key= {index}>
      <p className='role'>{chatMessage.role}</p>
      <p>{chatMessage.content}</p>
    </li>)}

      </ul>

      <div className="bottom-section">
        <div className="input-container">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Enter text here...'  onKeyDown={handleKeyDown}/>
          <div id="submit" onClick={getMessages}>➤</div>
        </div>
        <p className="info"> This is a ChatGPT clone and is for educational purposes only</p>
      </div>
    </section>
  </div>
)
}

export default App;
