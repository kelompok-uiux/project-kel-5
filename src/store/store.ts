import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit"
import noteReducer from "../features/note/noteSlice"

const rootReducer = combineReducers({
  note: noteReducer,
})

const store : any=  (preloadedState?: PreloadedState<RootState>) =>{
 return  configureStore({
    reducer:  rootReducer,
    
    preloadedState
  })
} 

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export type AppDispatch = AppStore['dispatch']

