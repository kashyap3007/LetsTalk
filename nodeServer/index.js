// node server which will handle socket io connections
const io = require("socket.io")(8000);
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     //disconnect event hota hn 
     //This event is fired upon disconnection.

// socket.on("disconnect", (reason) => {
//     // ...
//   });

//socket.id hrr new connection ki id hn 

     socket.on('disconnect', message=>{
        socket.broadcast.emit('middle', users[socket.id]);
        delete users[socket.id];
    });
 })
