import React from 'react';
import io from 'socket.io-client';

export const Context = React.createContext();

const initState = {
    general: [
        {from: "Raghav", msg: "Hello bhai"},
        {from: "Bhaghav", msg: "Hello bhai"},
        {from: "Hahav", msg: "Hello bhai"},
    ],
    topic: [
        {from: "Raghav", msg: "Hello bhai"},
        {from: "Raghav", msg: "Hello bhai"},
        {from: "Hiiihav", msg: "Hello bhai"},
    ]
}

function reducer(state, action) {
    const { msg, from, topic } = action.payload;
    switch(action.type){
        case 'RECEIVE_MESSAGE': 
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
        default: 
            return state
    }
}

let socket;

export default function Store(props) {

    if(!socket){
        socket = io('http://localhost:3001');
        console.log(socket);
    }

    const [ allChats ] = React.useReducer(reducer, initState);

    return (
        <Context.Provider value={{allChats}}>
            {props.children}
        </Context.Provider>
    )
}
