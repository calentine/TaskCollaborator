import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
            cors:{
                origin:'*',
                methods: ['GET', 'POST']
            }
});

let sharedTasks = [];
io.on('connection', socket =>{
    console.log('A user connected:', socket.id);

    // broadcast tasks to the new user
    socket.emit('taskList', sharedTasks);

    // Adding a new task
    socket.on('addTask', (task)=> {
        sharedTasks.push(task);
        // Notifying all connected clients
        io.emit('taskList', sharedTasks);
        console.log('User:', socket.id);
        console.log('added task:', task);
    });

    // deleting a task
    socket.on('deleteTask', (taskId)=> {
        const deletedTask = sharedTasks.find((task)=> task.id === taskId);
        sharedTasks = sharedTasks.filter((task)=> task.id !== taskId);

        console.log('User:', socket.id);
        console.log('removed task:', deletedTask);
        
        // Notifying all connected clients
        io.emit('taskList', sharedTasks);
    });

    socket.on('disconnect', () =>{
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3001;
httpServer.listen(PORT, ()=>{
    console.log('Server listening on http://localhost: '+ PORT);
});
