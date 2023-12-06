import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import { type Story } from '../models/Stroy.model'
import { type Question } from '../models/Questions.model'
import { QuestionsByType } from '../adapters/Question.adapter'

const style = StyleSheet.create({
  page: {
    padding: 40
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 25
  },
  text: {
    marginBottom: 20
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 14
  },
  image: {
    marginBottom: 10,
    height: 150,
    width: 150
  },
  titleQuestions: {
    fontSize: 20,
    marginBottom: 20
  },
  titleTypeQuestions: {
    fontSize: 15
  },
  quetsionsPart: {
    marginTop: 15
  },
  question: {
    marginBottom: 15,
    fontSize: 10
  },
  partQuestions: {
    marginBottom: 5
  },
  line: {
    marginTop: 12,
    marginBottom: 10
  }
})

const PdfDocStory: React.FC<{ story: Story, questions: Question[] | undefined }> = ({ story, questions }) => {
  return (
    <Document>
      <Page size={'A4'} style={style.page} >
        <View>
          <Text
              style={style.title} >
              {story.title}
          </Text>
            <View style={style.text} >
              {story.introduction.map((paragraft, idx) => (
                    <Text
                    style={style.paragraph}
                    key={idx}>
                      {paragraft}
                  </Text>
              ))}
              {story.images !== undefined && <Image
                src={story.images.introduction.url}
                style={style.image} />}
              {story.middle.map((paragraft, idx) => (
                    <Text
                    style={style.paragraph}
                    key={idx}>
                        {paragraft}
                    </Text>
              ))}
              {story.images !== undefined &&
              <Image
                src={story.images.middle.url}
                style={style.image} /> }
              {story.end.map((paragraft, idx) => (
                    <Text
                    style={style.paragraph}
                    key={idx}>
                        {paragraft}
                    </Text>
              ))}
            </View>
            {story.images !== undefined &&
              <Image
                src={story.images.end.url}
                style={style.image} />}
        </View>
        {(questions !== undefined && questions.length !== 0) && <QuestionPDf questions={questions} />}
      </Page>
    </Document>
  )
}

const QuestionPDf: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const questionsType = QuestionsByType(questions)
  return (
    <View>
        <Text style={style.titleQuestions} >
        Preguntas:
        </Text>
        {questionsType.literalQuestions.length !== 0 &&
        <View style={style.partQuestions} >
          <Text style={style.titleTypeQuestions} >
            Comprension Literal:
          </Text>
          <View style={style.quetsionsPart} >
            { questionsType.literalQuestions.map((question, idx) => (
              <View key={idx} >
              <Text
              style={style.question}>
                    {question.question}
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
            </View>
            ))}
          </View>
        </View>}
        { questionsType.inferencialQuestions.length !== 0 &&
        <View style={style.partQuestions} >
          <Text style={style.titleTypeQuestions} >
            Comprension inferencial:
          </Text>
          <View style={style.quetsionsPart} >
          { questionsType.inferencialQuestions.length !== 0 && questionsType.inferencialQuestions.map((question, idx) => (
            <View key={idx} >
              <Text
              style={style.question}>
                    {question.question}
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
              <Text style={style.line} >
                --------------------------------------------------------------------------------------------
              </Text>
            </View>
          ))}
          </View>
        </View>}
        { questionsType.criticoQuestions.length !== 0 &&
          <View style={style.partQuestions} >
            <Text style={style.titleTypeQuestions} >
              Comprension Critica:
            </Text>
            <View style={style.quetsionsPart} >
              { questionsType.criticoQuestions.length !== 0 && questionsType.criticoQuestions.map((question, idx) => (
                <View key={idx} >
                <Text
                style={style.question}>
                      {question.question}
                </Text>
                <Text style={style.line} >
                  --------------------------------------------------------------------------------------------
                </Text>
                <Text style={style.line} >
                  --------------------------------------------------------------------------------------------
                </Text>
                <Text style={style.line} >
                  --------------------------------------------------------------------------------------------
                </Text>
              </View>
              ))}
            </View>
          </View>}
    </View>
  )
}

export default PdfDocStory
