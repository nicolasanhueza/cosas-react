import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import { type FromLanguage, type Language, type Action, type State } from '../types'

// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
  tokenCount: null // Agrega el conteo de tokens al estado inicialz
}

// 2. Create a reducer
function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      tokenCount: null // Resetea el conteo de tokens
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
      tokenCount: null // Resetea el conteo de tokens
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
      tokenCount: null // Resetea el conteo de tokens
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
      tokenCount: null // Resetea el conteo de tokens
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
      tokenCount: action.tokenCount // Actualiza el conteo de tokens
    }
  }

  // Nuevo caso para actualizar el conteo de tokens
  if (type === 'SET_TOKEN_COUNT') {
    return {
      ...state,
      tokenCount: action.payload // Establece el nuevo conteo de tokens
    }
  }

  return state
}

export function useStore () {
  // 3. usar el hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    tokenCount // Agrega esto
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string, tokenCount: number | null) => { // Acepta el conteo de tokens como argumento
    dispatch({ type: 'SET_RESULT', payload, tokenCount }) // Despacha el conteo de tokens
  }

  const setTokenCount = (payload: number | null) => {
    dispatch({ type: 'SET_TOKEN_COUNT', payload }) // Nueva función para establecer el conteo de tokens
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    tokenCount, // Agrega esto
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    setTokenCount // Agrega esto
  }
}
