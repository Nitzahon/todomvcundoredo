export default function undoable(reducer) {
    // Call the reducer with empty action to populate the initial state
    const initialState = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    }
    // //recursive switch function do conditionally go to default based on past/future length
    // const doableSwitch = (state, action, type) => {
    //     switch (type) {
    //         case 'UNDO':
    //             if (past.length > 0) { //check if is undoable, and prevent state change if not (better to check here to avoid checking for each wrapped reducer)
    //                 const previous = past[past.length - 1]
    //                 const newPast = past.slice(0, past.length - 1)
    //                 return {
    //                     past: newPast,
    //                     present: previous,
    //                     future: [present, ...future]
    //                 }
    //             }
    //             return doableSwitch(state, action, ""); //if past === 0 , return default state of reducer using recursion
    //         case 'REDO':
    //             if (future.length > 0) { //check if is redoable, and prevent state change if not (better to check here to avoid checking for each wrapped reducer)
    //                 const next = future[0]
    //                 const newFuture = future.slice(1)
    //                 return {
    //                     past: [...past, present],
    //                     present: next,
    //                     future: newFuture
    //                 }
    //             }
    //         //fallthrough to default if past.future=0
    //         default:
    //             // Delegate handling the action to the passed reducer
    //             const newPresent = reducer(present, action)
    //             if (present === newPresent) {
    //                 return state
    //             }
    //             return {
    //                 past: [...past, present],
    //                 present: newPresent,
    //                 future: []
    //             }
    //     }

    // }
    // Return a reducer that handles undo and redo
    return function (state = initialState, action) {
        const { past, present, future } = state;
        switch (action.type) {
            case 'UNDO':
                if (past.length > 0) { //check if is undoable, and prevent state change if not (better to check here to avoid checking for each wrapped reducer)
                    const previous = past[past.length - 1]
                    const newPast = past.slice(0, past.length - 1)
                    return {
                        past: newPast,
                        present: previous,
                        future: [present, ...future]
                    }
                }
                return {
                    ...state
                }
            //do nothing if past.length=0
            case 'REDO':
                if (future.length > 0) { //check if is redoable, and prevent state change if not (better to check here to avoid checking for each wrapped reducer)
                    const next = future[0]
                    const newFuture = future.slice(1)
                    return {
                        past: [...past, present],
                        present: next,
                        future: newFuture
                    }
                }
                return {
                    ...state
                }
            //do nothing if future.length=0
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action)
                if (present === newPresent) {
                    return state
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    }
}