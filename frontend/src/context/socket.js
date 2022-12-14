import React from "react";
import socketio from "socket.io-client";
require("dotenv").config()
// import { SOCKET_URL } from "config";

export const socket = socketio(`https://gamenight-project.herokuapp.com:${process.env.PORT}`)
export const SocketContext = React.createContext();