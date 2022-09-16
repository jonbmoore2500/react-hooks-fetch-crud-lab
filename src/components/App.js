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

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={onNewQuestion}/> : <QuestionList questions={questions} onDelete={onDelete}/>}
    </main>
  );
}

export default App;
