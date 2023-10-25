// import { spawn } from 'child_process';
// // Start links.js
// const linksProcess = spawn('node', ['links.js']);

// // Start statements.js
// const statementsProcess = spawn('node', ['statements.js']);

// // Log any errors from the child processes
// linksProcess.on('error', (err) => {
//   console.error('Error starting links.js:', err);
// });

// statementsProcess.on('error', (err) => {
//   console.error('Error starting statements.js:', err);
// });

// // Log when the child processes are exited
// linksProcess.on('exit', (code) => {
//   console.log(`links.js process exited with code ${code}`);
// });

// statementsProcess.on('exit', (code) => {
//   console.log(`statements.js process exited with code ${code}`);
// });

import app from './app.js'
import http from 'http'
const server = http.createServer(app)

const PORT = 3001
const HOST = '127.0.0.1'

server.listen(PORT, HOST, () => {
   console.log(`Server running on http://${HOST}:${PORT}`)
})