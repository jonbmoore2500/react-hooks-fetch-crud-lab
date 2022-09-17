import React from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList({questions, onDelete, onSetCorrect}) {
  
  function onDeleteQL(deleteId) {
    onDelete(deleteId)
  }

  function setCorrectIndexQL(newIndex, id) {
    onSetCorrect(newIndex, id)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => {
        return <QuestionItem key={question.id} question={question} handleDelete={onDeleteQL} setCorrectIndex={setCorrectIndexQL}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
