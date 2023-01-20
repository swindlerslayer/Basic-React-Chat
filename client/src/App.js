import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

//...
const socket = io.connect("http://localhost:3001");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  
  const joinRoom = () => {
    if (username !== "" && room !== ""){
      socket.emit("Odaya_katil", room);
      setShowChat(true);
    }

  };
  
 
 
 
  return (
    
      <><div className="App">
      <div class='box'>
        <div class='wave -one'></div>
        <div class='wave -two'></div>
        <div class='wave -three'></div>
      </div>
      {!showChat ? (
        <div className="joinChatContainer" style={{ zIndex: 10 }}>
          <div class="animate-charcter"><h3>Gruba Katılın</h3></div>

          <input
            type="text" placeholder="Kullanici Adiniz.." onChange={(event) => { setUsername(event.target.value); } } />
          <input type="text" placeholder="Oda İD" onChange={(event) => { setRoom(event.target.value); } } />
          <button onClick={joinRoom}>Bir Odaya Katılın</button>
        </div>
      )
        : (
          <Chat socket={socket} username={username} room={room} />
        )}


    </div><div class="animated-background">
      </div></>

    
  );
};

export default App;
