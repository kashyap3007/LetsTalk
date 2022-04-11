
const socket = io('http://localhost:8000');

// Send container is a form
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")
//message container is for class container
let audio = new Audio('ting.mp3');

//With a querySelector statement, you can select an element based on a CSS selector. This means you can select elements by ID, class, or any other type of selector. Using the getElementById method, you can only select an element by its ID. 


const append = (message, position)=>
{
    const messageElement = document.createElement('div');
    //   // create a new div element
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    // message.container me append kr do 
    //message element ko
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left')
    {
        console.log('sound is playing');
        audio.play();
    }

    //U are always left
    // other person is always right
}
//User has loaded messages for the first time.
// New messages have arrived and you are at the bottom of the scroll

//The addEventListener() method attaches an event handler to an element.
//The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
// For example, this can be useful when:

// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL

form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    //isse reload nhi hoga page aapka
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    //${template literal}
    //left and right class name for left and right indication

    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join LetsTalk");
socket.emit('new-user-joined', name)
//The Socket.IO API is inspired from the Node.js EventEmitter, which means you can emit events on one side and register listeners on the other:



socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'join');
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

socket.on('middle', name=>{
    append(`${name } left the chat`, 'middle');
})

//socket.emit - This method is responsible for sending messages