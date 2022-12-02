import React from "react";
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = socketio('http://localhost:8000')
export const SocketContext = React.createContext();