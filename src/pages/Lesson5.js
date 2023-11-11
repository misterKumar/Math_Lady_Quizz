import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson5.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession5 } from '../asset/data';


const Lesson5 = () => {

  const [index, setIndex] = useState(0)
  const [questionOfLession, setQuestionOfLession] = useState(() => {
    if (localStorage.getItem("questionOfLession5")) {
      return JSON.parse(localStorage.getItem("questionOfLession5"));
    } else {
      return questionOfLession5
    }
  });

  const [userAnswer, setUserAnswer] = useState(() => {
    if (localStorage.getItem("questionOfLession5")) {
      let questionOfLession5 = JSON.parse(localStorage.getItem("questionOfLession5"));
      return questionOfLession5[0].userAnswer
    } else {
      return ""
    }
  });


  const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession5")) || questionOfLession5;
  
  const storeDataInLocalStorage = (questionOfLession5) => localStorage.setItem("questionOfLession5", JSON.stringify(questionOfLession5));

  function handleCheck(currobj) {
    if (!userAnswer) {
      toast.warn("Pease choose the option!", {}); return;
    }
    if (currobj.noOfAttempt <= 0) {
      toast.error("not of attempt exceed!", {}); return
    }

    let questionOfLession5 = getDataFromLocalStorage()
    if (questionOfLession5[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
      toast.info("Please reset the quiz to start again", {}); return
    }
    questionOfLession5 = questionOfLession5.map((obj) => {
      if (obj.qId === currobj.qId) {
        return {
          ...currobj,
          qStatus: currobj.correctAnswer === userAnswer ? "correct" : "incorrect",
          noOfAttempt: currobj.noOfAttempt - 1,
          userAnswer: userAnswer,
        }
      } else {
        return obj
      }
    })

    storeDataInLocalStorage(questionOfLession5);
    setQuestionOfLession(questionOfLession5)

    if (currobj.correctAnswer === userAnswer) {
      new Audio(win_audio).play()
    } else {
      new Audio(err_audio).play()
    }
  }

  function handleFlag(currobj) {
    let questionOfLession5 = getDataFromLocalStorage();
    questionOfLession5 = questionOfLession5.map((obj) => {
      if (obj.qId === currobj.qId) {
        return { ...obj, isFlag: obj.isFlag === true ? false : true };
      } else {
        return obj
      }
    })
    storeDataInLocalStorage(questionOfLession5);
    setQuestionOfLession(questionOfLession5)
  }

  function handlePreviousClick() {
    let questionOfLession5 = getDataFromLocalStorage();
    if (questionOfLession5[index].isSubmit) {
      setUserAnswer(questionOfLession5[index - 1].userAnswer)
      setIndex(index - 1); return;
    }

    let i = index;
    while (--i >= 0) {
      if (questionOfLession5[i].isFlag) {
        setIndex(i)
        setUserAnswer("")
        return;
      }
    }

    toast.warn("You can only visit previous when you bookmark the question!")
  }

  function handleNextClick() {
    let questionOfLession5 = getDataFromLocalStorage();
    if (questionOfLession5[index].isSubmit) {
      setUserAnswer(questionOfLession5[index + 1].userAnswer)
      setIndex(index + 1); return;
    }

    let i = index;
    console.log(i)
    while (++i < questionOfLession5.length) {
      if (questionOfLession5[i].isFlag || questionOfLession5[i].isVisited === false) {
        setIndex(i)
        break
      }
    }
    questionOfLession5[index].isVisited = true
    storeDataInLocalStorage(questionOfLession5);
    setUserAnswer("")
  }

  function handleSubmitQuiz() {
    let questionOfLession5 = getDataFromLocalStorage();
    questionOfLession5 = questionOfLession5.map((obj) => {
      return {
        ...obj, isFlag: false,
        isVisited: false, qStatus: "notAttempt", isSubmit: true,
      }
    })
    storeDataInLocalStorage(questionOfLession5);
    setQuestionOfLession(questionOfLession5)
    setIndex(0)
    setUserAnswer(questionOfLession5[0].userAnswer)
    toast.info("Check Your Answer!", {})
  }

  function handleResetQuiz() {
    localStorage.removeItem("questionOfLession5");

    console.log(questionOfLession5);
    setQuestionOfLession(questionOfLession5)
    setIndex(0)
    setUserAnswer("")
  }



  return (
    <div className='lesson lesson5'>
      <div className='box-cont'>

        {
          questionOfLession.length > 0 && questionOfLession.map((obj) => {
            return <div className="box" key={`5-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
              <div className='equation'>
                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                  {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                  <span>flag for later</span></div>
              </div>

              <div className='mid-part'>




                <div className='mid_left'>

                  {
                    obj.options.map((oneOption) => (
                      <label key={oneOption} >
                        <input type="radio" name={`qNo${obj.qId}`} value={oneOption} checked={oneOption === userAnswer} onChange={(e) => { setUserAnswer(e.target.value) }} />
                        {oneOption}
                      </label>
                    ))
                  }



                </div>






                <div className='mid_right'>
                  <button onClick={() => handleCheck(obj)}>Check</button>
                  <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                </div>
              </div>

              {obj.qStatus === "correct" &&
                <div className='correct-ans'>
                  <FiCheck />
                  <span> Note:Congratulations! The answer provided is [{obj.userAnswer}] for this question is correct</span>
                </div>
              }

              {obj.qStatus === "incorrect" &&
                <div className='incorrect-ans'>
                  <FiAlertCircle />
                  <span>Note:Your answer provided is [{obj.userAnswer}] for this question is incorrect</span>
                </div>
              }

              {obj.isSubmit &&
                <div className={`${obj.correctAnswer === obj.userAnswer ? "correct-ans" : "incorrect-ans"}`}>
                  {obj.correctAnswer === obj.userAnswer ? <FiCheck /> : <FiAlertCircle />}
                  <span>{obj.userAnswer ? `Your Ans:${obj.userAnswer}` : "You did not provide any answer!"}</span>
                </div>
              }
              {obj.isSubmit &&
                <div className='correct-ans'>
                  <FiCheck />
                  <span>Correct Ans:{obj.correctAnswer}</span>
                </div>
              }

            </div>
          })
        }

      </div>

      <div className='btn-cont'>
        <button disabled={index === 0} style={{ background: `${index === 0 ? "#b0cae3" : "dodgerblue"}` }} onClick={handlePreviousClick}><BsArrowLeft /></button>
        {questionOfLession[0].isSubmit ? <button onClick={handleResetQuiz} style={{ background: "grey" }}>Reset Quiz</button> :
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>}

        <button disabled={index >= (questionOfLession.length - 1)}
          style={{ background: `${(index >= (questionOfLession.length - 1)) ? "#b0cae3" : "dodgerblue"}` }} onClick={handleNextClick}><BsArrowRight /></button>
      </div>
    </div>
  )
}

export default Lesson5