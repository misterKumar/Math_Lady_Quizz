import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson1.css"

import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession1 } from "../asset/data"


const Lesson1 = () => {
    const [index, setIndex] = useState(0);
    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession1")) {
            return JSON.parse(localStorage.getItem("questionOfLession1"));
        } else {
            return questionOfLession1
        }
    });

    const [userAnswer, setUserAnswer] = useState(() => {
        if (localStorage.getItem("questionOfLession1")) {
            let questionOfLession1 = JSON.parse(localStorage.getItem("questionOfLession1"));
            return questionOfLession1[0].userAnswer
        } else {
            return questionOfLession1[0].userAnswer
        }
    });



    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession1")) || questionOfLession1;
    
    const storeDataInLocalStorage = (questionOfLession1) => localStorage.setItem("questionOfLession1", JSON.stringify(questionOfLession1));

    function handleCheck(currobj) {
        if (!userAnswer) {
            toast.warn("Pease enter the answer!", {}); return;
        }
        if (currobj.noOfAttempt <= 0) {
            toast.error("number of attempts exceeded!", {}); return
        }

        let questionOfLession1 = getDataFromLocalStorage()
        if (questionOfLession1[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession1 = questionOfLession1.map((obj) => {
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

        storeDataInLocalStorage(questionOfLession1);
        setQuestionOfLession(questionOfLession1)

        if (currobj.correctAnswer === userAnswer) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession1 = getDataFromLocalStorage();
        questionOfLession1 = questionOfLession1.map((obj) => {
            if (obj.qId === currobj.qId) {
                return { ...obj, isFlag: obj.isFlag === true ? false : true };
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession1);
        setQuestionOfLession(questionOfLession1)
    }

    function handlePreviousClick() {
        let questionOfLession1 = getDataFromLocalStorage();
        if (questionOfLession1[index].isSubmit) {
            setUserAnswer(questionOfLession1[index - 1].userAnswer)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession1[i].isFlag) {
                setIndex(i)
                setUserAnswer(questionOfLession1[i].userAnswer)
                return;
            }
        }

        toast.warn("You can only visit previous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession1 = getDataFromLocalStorage();
        if (questionOfLession1[index].isSubmit) {
            setUserAnswer(questionOfLession1[index + 1].userAnswer)
            setIndex(index + 1); return;
        }

        let i = index;
        while (++i < questionOfLession.length) {
            if (questionOfLession1[i].isFlag || questionOfLession1[i].isVisited === false) {
                setIndex(i)
                console.log(questionOfLession1[i].userAnswer)
                setUserAnswer(questionOfLession1[i].userAnswer)
                break
            }
        }
        questionOfLession1[index].isVisited = true
        storeDataInLocalStorage(questionOfLession1);

    }

    function handleSubmitQuiz() {
        let questionOfLession1 = getDataFromLocalStorage();
        questionOfLession1 = questionOfLession1.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession1);
        setQuestionOfLession(questionOfLession1)
        setIndex(0)
        setUserAnswer(questionOfLession1[0].userAnswer)
        toast.info("Check Your Answer!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession1");

        console.log(questionOfLession1);
        setQuestionOfLession(questionOfLession1)
        setIndex(0)
        setUserAnswer("")
    }

    return (
        <div className='lesson lesson1'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`1-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}=?</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>


                                <div className='mid_left'>
                                    <small >Answer</small>
                                    <input type="text" placeholder='Enter Your Answer'
                                        value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                                    {console.log(userAnswer)}
                                </div>


                                <div className='mid_right'>
                                    <button onClick={() => handleCheck(obj)}>Check</button>
                                    <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                                </div>
                            </div>

                            {obj.qStatus === "correct" &&
                                <div className='correct-ans'>
                                    <FiCheck style={{ fontSize: "30px" }} />
                                    <span> Note:Congratulations! The answer provided is [{obj.userAnswer}] for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus === "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle style={{ fontSize: "30px" }} />
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

export default Lesson1