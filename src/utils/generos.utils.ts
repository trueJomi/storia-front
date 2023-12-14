import { type Genero } from '../models/utils/GeneroModel'

function promptGeneroHistorico (prompt: string) {
  return `crea una historia con sucesos hisotricos contado desde un punto de vista global ${prompt}`
}

function promptGeneroDeporte (prompt: string) {
  return `has una narracion dinamica con hechos deportivos deportiva sobre ${prompt}`
}

function promptGeneroRomance (prompt: string) {
  return `crea una historia romatica sobre ${prompt}`
}

function promptGeneroTerror (prompt: string) {
  return `crea una historia de terror sobre ${prompt}`
}

function promptGeneroAventura (prompt: string) {
  return `crea una historia de aventura sobre ${prompt}`
}

export const generosList: Genero[] = [
  {
    nombre: 'Libre',
    function: (prompt: string) => prompt
  },
  {
    nombre: 'Historico',
    function: promptGeneroHistorico
  },
  {
    nombre: 'Deporte',
    function: promptGeneroDeporte
  },
  {
    nombre: 'Romance',
    function: promptGeneroRomance
  },
  {
    nombre: 'Terror',
    function: promptGeneroTerror
  },
  {
    nombre: 'Aventura',
    function: promptGeneroAventura
  }
]
