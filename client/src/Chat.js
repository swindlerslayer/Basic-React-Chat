import React, { useEffect, useState } from 'react' 

function Chat({socket, username, room}) {
    const [CurrentMessage, setCurrentMessage] = useState("");
    const [messageList, setmMessageList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

     
    const sendMessage = async () => {
        if (CurrentMessage !== "" && !messageList.find(msg => msg.message === CurrentMessage)) {
            const messageData = {
                room: room,
                author: username,
                message: CurrentMessage,
                time: 
                new Date(Date.now()).getHours() + ":" +
                new Date(Date.now()).getMinutes() 
    
            };
            await socket.emit("send_message", messageData);
        }
    };
    

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            if (!messageList.find(msg => msg.message === data.message && msg.author === data.author)) {
                setmMessageList((list) => [...list, data]);
            }
        });
        return () => socket.off("recieve_message");
    }, []);


    return (
        
        <div className='chat-window' style={{zIndex:10}}>
                <div className='chat-header'>
                    <p><h4><i>Canlı Sohbet</i></h4></p>
                </div>
                <div className='chat-body'>
                {messageList.map((messageContent) => {
                        return <h1>{messageContent.message}</h1>;
                    })}
                </div>
                <div className='chat-footer'>

                    <input type="text" placeholder='Merhaba...'
                        onChange={(event) => { setCurrentMessage(event.target.value); } } />
                    <button onClick={sendMessage}>&#9758;</button>

                </div>
            </div>
            
            
    )
}

export default Chat;