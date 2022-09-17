import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questionsData => setQuestions(questionsData))
  }, [])

  function onNewQuestion(newQuestions) {
    setQuestions([...questions, newQuestions])
  }

  function onDelete(deleteId) {
    fetch(`http://localhost:4000/questions/${deleteId}`, {
    method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const newQuestions = questions.filter(question => question.id !== deleteId)
      setQuestions(newQuestions)
    })
  }

  function handleNewCorrect(newCorrect, id) {
    console.log('in app', newCorrect, id)
    fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "correctIndex": newCorrect
    })
    })
    .then(r => r.json())
    .then((updatedQuestion) => {
      const newQuestions = questions.map((question) => {
        if (question.id === id) {
          return {...question, correctIndex: newCorrect}
        }
        return question
      })
      console.log(newQuestions)
      
    })
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={onNewQuestion}/> : <QuestionList questions={questions} onDelete={onDelete} onSetCorrect={handleNewCorrect}/>}
    </main>
  );
}

export default App;
