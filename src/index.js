import './styles.css'
import { applyMiddleware, createStore, compose } from 'redux'
import {
  increment,
  decrement,
  asyncIncrement,
  changeTheme,
} from './redux/actions'
import rootReducer from './redux/rootReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from '@redux-devtools/extension'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  const state = store.getState()
  counter.textContent = state.counter
  document.body.className = state.theme.value
  ;[addBtn, subBtn, asyncBtn].forEach(
    (btn) => (btn.disabled = state.theme.disabled)
  )
})

store.dispatch({ type: 'INIT_APPLICATION' })
