import {useState, useEffect} from 'react'

const App = () => {
  const [value, setValue] = useState(null)
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
    const response = await fetch('http://localhost:8000/completions', options)
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
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Enter text here...'/>
          <div id="submit" onClick={getMessages}>➢</div>
        </div>
        <p className="info"> This is a clone of ChatGPT for education experiences only</p>
      </div>
    </section>
  </div>
)
}

export default App;
