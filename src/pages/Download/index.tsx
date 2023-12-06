import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getStory } from '../../services/StoryService'
import { getUser } from '../../services/AuthService'
import { type Story } from '../../models/Stroy.model'
import Loading from '../../components/Loading'
import { type Question } from '../../models/Questions.model'
import { getQuestions } from '../../services/QuestionsService'
import ForDownload from './components/ForDownload'

const DownloadView: React.FC = () => {
  const { id } = useParams()
  const [story, setStory] = React.useState<Story | undefined>(undefined)
  const [questions, setQuestions] = React.useState<Question[] | undefined>(undefined)

  useEffect(() => {
    if (id !== undefined) {
      void getStory(getUser().uid, id).then((story) => {
        setStory(story)
      })
    }
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      void getQuestions(getUser().uid, id, setQuestions)
    }
  }, [])

  if (questions === undefined && story === undefined) {
    return <Loading/>
  }
  return (
    (questions !== undefined && story !== undefined) && <ForDownload story={story} questions={questions} />
  )
}

export default DownloadView
