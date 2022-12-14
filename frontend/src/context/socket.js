import React from "react";
import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";

export const socket = socketio('https://gamenight-project.herokuapp.com:8000')
export const SocketContext = React.createContext();