import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson6.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession6 } from '../asset/data';

const Lesson6 = () => {
    const [index, setIndex] = useState(0)
    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession6")) {
            return JSON.parse(localStorage.getItem("questionOfLession6"));
        } else {
            return questionOfLession6
        }
    });

    const [userAnswer, setUserAnswer] = useState(() => {
        if (localStorage.getItem("questionOfLession6")) {
            let questionOfLession6 = JSON.parse(localStorage.getItem("questionOfLession6"));
            return questionOfLession6[0].userAnswer
        } else {
            return []
        }
    });


   
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession6")) || questionOfLession6;

    const storeDataInLocalStorage = (questionOfLession6) => localStorage.setItem("questionOfLession6", JSON.stringify(questionOfLession6));

    function handleCheck(currobj) {
        if (userAnswer.length === 0) {
            toast.warn("Pease choose the option!", {}); return;
        }

        if (currobj.noOfAttempt <= 0) {
            toast.error("number of attempts exceed!", {}); return;
        }

        let questionOfLession6 = getDataFromLocalStorage()
        if (questionOfLession6[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession6 = questionOfLession6.map((obj) => {
            if (obj.qId === currobj.qId) {
                return {
                    ...currobj,
                    qStatus: evaluateuserAnswer(currobj.correctAnswer, userAnswer) ? "correct" : "incorrect",
                    noOfAttempt: currobj.noOfAttempt - 1,
                    userAnswer: [...userAnswer],
                }
            } else {
                return obj
            }
        })

        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)

        if (currobj.correctAnswer.sort().join() === userAnswer.sort().join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession6 = getDataFromLocalStorage();
        questionOfLession6 = questionOfLession6.map((obj) => {
            if (obj.qId === currobj.qId) {
                return { ...obj, isFlag: obj.isFlag === true ? false : true };
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)
    }

    function handlePreviousClick() {
        let questionOfLession6 = getDataFromLocalStorage();
        if (questionOfLession6[index].isSubmit) {
            setUserAnswer(questionOfLession6[index - 1].userAnswer)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession6[i].isFlag) {
                setIndex(i)
                setUserAnswer([])
                return;
            }
        }

        toast.warn("You can only visit previous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession6 = getDataFromLocalStorage();
        if (questionOfLession6[index].isSubmit) {
            setUserAnswer(questionOfLession6[index + 1].userAnswer)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession6.length) {
            if (questionOfLession6[i].isFlag || questionOfLession6[i].isVisited === false) {
                setIndex(i)
                break
            }
        }
        questionOfLession6[index].isVisited = true
        storeDataInLocalStorage(questionOfLession6);
        setUserAnswer([])
    }

    function handleSubmitQuiz() {
        let questionOfLession6 = getDataFromLocalStorage();
        questionOfLession6 = questionOfLession6.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession6);
        setQuestionOfLession(questionOfLession6)
        setIndex(0)
        setUserAnswer(questionOfLession6[0].userAnswer)
        toast.info("Check Your Answer!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession6");

        console.log(questionOfLession6);
        setQuestionOfLession(questionOfLession6)
        setIndex(0)
        setUserAnswer([])
    }

    function handleCheckBoxClick(userCheckBoxVal) {
        if (!userAnswer.includes(userCheckBoxVal)) {
            userAnswer.push(userCheckBoxVal)
        } else {
            let i = userAnswer.indexOf(userCheckBoxVal);
            userAnswer.splice(i, 1)
        }
        setUserAnswer([...userAnswer])
        console.log(userAnswer)
    }

    function evaluateuserAnswer(correctAnswer, userAnswer) {
        if (correctAnswer.length !== userAnswer.length) return false;  
        if (correctAnswer.sort().join(",") !== userAnswer.sort().join(",")) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className='lesson lesson6'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`6-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>




                                <div className='mid_left'>


                                    {
                                        obj.options.map((val, i) => (

                                            <label key={val}>
                                                <input type="checkbox" value={obj.options[i]} checked={userAnswer.includes(obj.options[i])} onChange={(e) => handleCheckBoxClick(e.target.value)} />
                                                {obj.options[i]}
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
                                    <span> Note:Congratulations! The answer provided is {obj.userAnswer.sort().join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus === "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answer provided is {obj.userAnswer.sort().toString()} for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswer.sort().join() === obj.userAnswer.sort().join() ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswer.sort().join() === obj.userAnswer.sort().join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{obj.userAnswer.length !== 0 ? `Your Ans:${obj.userAnswer.sort().join()}` : "You did not provide any answer!"}</span>
                                </div>
                            }
                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans:{obj.correctAnswer.sort().join()}</span>
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

export default Lesson6