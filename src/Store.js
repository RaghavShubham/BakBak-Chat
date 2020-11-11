import React from 'react'

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
export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState);

    return (
        <Context.Provider value={reducerHook}>
            {props.children}
        </Context.Provider>
    )
}
