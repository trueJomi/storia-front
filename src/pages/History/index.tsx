import React, { useEffect, useState } from 'react'
import History from '../../components/History'
import { getUser } from '../../services/AuthService'
import { getHistorialStory } from '../../services/StoryService'
import { type Story } from '../../models/Stroy.model'

const HistoryPage: React.FC = () => {
  const [historial, setHistorial] = useState<Story[] | undefined>(undefined)
  const getHistorial = () => {
    void getHistorialStory(getUser().uid, setHistorial)
  }

  useEffect(() => {
    getHistorial()
  }, [])
  return (
    <History data={historial} />
  )
}

export default HistoryPage
