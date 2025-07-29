// socket.js
import {io} from 'socket.io-client';

const SOCKET_URL = 'https://skeaks.vercel.app:5003'; // replace with your backend URL

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // ensures websocket transport
  jsonp: false,
});

export default socket;
