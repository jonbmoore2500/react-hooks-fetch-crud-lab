import React from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList({questions, onDelete}) {
  
  function onDeleteQL(deleteId) {
    onDelete(deleteId)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
        return <QuestionItem key={question.id} question={question} handleDelete={onDeleteQL}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
