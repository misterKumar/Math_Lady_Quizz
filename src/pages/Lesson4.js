import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson4.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession4 } from "../asset/data"



const Lesson4 = () => {

    const [index, setIndex] = useState(0)

    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession4")) {
            return JSON.parse(localStorage.getItem("questionOfLession4"));
        } else {
            return questionOfLession4
        }
    });

    const [userAnswer, setUserAnswer] = useState(() => {
        if (localStorage.getItem("questionOfLession4")) {
            let questionOfLession4 = JSON.parse(localStorage.getItem("questionOfLession4"));
            return questionOfLession4[0].userAnswer
        } else {
            return questionOfLession4[0].userAnswer
        }
    });

    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

  
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession4")) || questionOfLession4;
   
    const storeDataInLocalStorage = (questionOfLession4) => localStorage.setItem("questionOfLession4", JSON.stringify(questionOfLession4));

    function handleCheck(currobj) {

        if (currobj.noOfAttempt <= 0) {
            toast.error("number of attempts exceeded!", {}); return
        }

        let questionOfLession4 = getDataFromLocalStorage()
        if (questionOfLession4[0].isSubmit) {
            toast.info("Please reset the quiz to start again", {}); return
        }

        questionOfLession4 = questionOfLession4.map((obj) => {
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

        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)

        if (currobj.correctAnswer.join() === userAnswer.join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession4 = getDataFromLocalStorage();
        questionOfLession4 = questionOfLession4.map((obj) => {
            if (obj.qId === currobj.qId) {
                return { ...obj, isFlag: obj.isFlag === true ? false : true };
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)
    }
    function handlePreviousClick() {
        let questionOfLession4 = getDataFromLocalStorage();
        if (questionOfLession4[index].isSubmit) {
            setUserAnswer(questionOfLession4[index - 1].userAnswer)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession4[i].isFlag) {
                setIndex(i)
                setUserAnswer(questionOfLession4[i].userAnswer)
                return;
            }
        }

        toast.warn("You can only visit previous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession4 = getDataFromLocalStorage();
        if (questionOfLession4[index].isSubmit) {
            setUserAnswer(questionOfLession4[index + 1].userAnswer)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession4.length) {
            if (questionOfLession4[i].isFlag || questionOfLession4[i].isVisited === false) {
                setIndex(i)
                setUserAnswer(questionOfLession4[i].userAnswer)
                break
            }
        }
        questionOfLession4[index].isVisited = true
        storeDataInLocalStorage(questionOfLession4);

    }

    function handleSubmitQuiz() {
        let questionOfLession4 = getDataFromLocalStorage()
        questionOfLession4 = questionOfLession4.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession4);
        setQuestionOfLession(questionOfLession4)
        setIndex(0)
        setUserAnswer(questionOfLession4[0].userAnswer)
        toast.info("Check Your Answer!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession4");
        console.log(questionOfLession4);
        setQuestionOfLession(questionOfLession4)
        setIndex(0)
        setUserAnswer(questionOfLession4[0].userAnswer);
    }
    

    function evaluateuserAnswer(correctAnswer, userAnswer) {
        console.log("correctAnswer by user", correctAnswer.join(","), userAnswer.join(","))
        if (correctAnswer.join(",") !== userAnswer.join(",")) {
            return false;
        } else {
            return true;
        }
    }

    


    function handleOnDragStart(i) {
        setdragItemIndex(i);
    }
    function handleOnDragOver(e, i) {
        e.preventDefault()
        setdragOverItemIndex(i)
        // console.log("handleOnDragOver", i)
    }

    function handleOnDrop(i) {
        // console.log("handleOnDrop", i)
        let removeItems = userAnswer.splice(dragItemIndex, 1);
        userAnswer.splice(i, 0, removeItems[0]);
        setUserAnswer([...userAnswer])
        console.log("userAnswer", userAnswer)
    }
    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }


    return (
        <div className='lesson lesson6'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`4-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>
                                <div className='mid_left'>
                                    <div className='list'>
                                        {
                                            userAnswer.map((val, i) => (
                                                <div key={i}
                                                    className={`${i === dragOverItemIndex ? "next_list_item" : 'list_item'}`}
                                                    draggable
                                                    onDragStart={() => handleOnDragStart(i)}
                                                    onDragOver={(e) => handleOnDragOver(e, i)}
                                                    onDrop={() => handleOnDrop(i)}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <span>{val}</span>
                                                    <BsThreeDotsVertical />
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>

                                <div className='mid_right'>
                                    <button onClick={() => handleCheck(obj)}>Check</button>
                                    <small className='attempt'>{obj.noOfAttempt} attempt left</small>
                                </div>
                            </div>

                            {obj.qStatus === "correct" &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span> Note:Congratulations! The answer provided is {obj.userAnswer.join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus === "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answer provided is {obj.userAnswer.toString()} for this question is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswer.join() === obj.userAnswer.join() ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswer.join() === obj.userAnswer.join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{obj.noOfAttempt !== 7 ? `Your Ans:${obj.userAnswer.join()}` : "You did not provide any answer!"}</span>
                                </div>
                            }
                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans:{obj.correctAnswer.join()}</span>
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

export default Lesson4