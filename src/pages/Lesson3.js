import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson3.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill} from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession3 } from "../asset/data";



const Lesson3 = () => {

    const [index, setIndex] = useState(0);

    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession3")) {
            return JSON.parse(localStorage.getItem("questionOfLession3"));
        } else {
            return questionOfLession3
        }
    });

    const [userAnswer, setUserAnswer] = useState(() => {
        if (localStorage.getItem("questionOfLession3")) {
            let questionOfLession3 = JSON.parse(localStorage.getItem("questionOfLession3"));
            return questionOfLession3[0].userAnswer
        } else {
            return questionOfLession3[0].userAnswer
        }
    });

    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession3")) || questionOfLession3;
    
    const storeDataInLocalStorage = (questionOfLession3) => localStorage.setItem("questionOfLession3", JSON.stringify(questionOfLession3));

    function handleCheck(currobj) {

        if (currobj.noOfAttempt <= 0) {
            toast.error("number of attempts exceeded!", {}); return
        }

        let questionOfLession3 = getDataFromLocalStorage()
        if (questionOfLession3[0].isSubmit) {
            toast.info("Please reset the quiz to start again", {}); return
        }

        questionOfLession3 = questionOfLession3.map((obj) => {
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

        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)

        if (currobj.correctAnswer.join() === userAnswer.join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession3 = getDataFromLocalStorage();
        questionOfLession3 = questionOfLession3.map((obj) => {
            if (obj.qId === currobj.qId) {
                return { ...obj, isFlag: obj.isFlag === true ? false : true };
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)
    }

    function handlePreviousClick() {
        let questionOfLession3 = getDataFromLocalStorage();
        if (questionOfLession3[index].isSubmit) {
            setUserAnswer(questionOfLession3[index - 1].userAnswer)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession3[i].isFlag) {
                setIndex(i)
                setUserAnswer(questionOfLession3[i].userAnswer)
                return;
            }
        }

        toast.warn("You can only visit previous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession3 = getDataFromLocalStorage();
        if (questionOfLession3[index].isSubmit) {
            setUserAnswer(questionOfLession3[index + 1].userAnswer)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession3.length) {
            if (questionOfLession3[i].isFlag || questionOfLession3[i].isVisited === false) {
                setIndex(i)
                setUserAnswer(questionOfLession3[i].userAnswer)
                break
            }
        }
        questionOfLession3[index].isVisited = true
        storeDataInLocalStorage(questionOfLession3);

    }

    function handleSubmitQuiz() {
        let questionOfLession3 = getDataFromLocalStorage();
        questionOfLession3 = questionOfLession3.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession3);
        setQuestionOfLession(questionOfLession3)
        setIndex(0)
        setUserAnswer(questionOfLession3[0].userAnswer)
        toast.info("Check Your Answer!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession3");
        console.log(questionOfLession3);
        setQuestionOfLession(questionOfLession3)
        setIndex(0)
        setUserAnswer(questionOfLession3[0].userAnswer)
    }


    function evaluateuserAnswer(correctAnswer, userAnswer) {
        console.log("correctAnswer,userAnswer", correctAnswer.join(","), userAnswer.join(","))
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
                        return <div className="box" key={`3-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>{obj.equation}</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>
                                <div className='mid_left'>
                                    <div className='table'>

                                        {
                                            userAnswer.map((val, i) => (
                                                <div className='table_item' key={val}>

                                                    <div className='img-cont'>
                                                        <img src={obj.images_arr[i]}  alt='imageoptions'/>
                                                    </div>
                                                    <button
                                                        className={`${i === dragOverItemIndex ? "next_btn" : ""}`}
                                                        draggable
                                                        onDragStart={() => handleOnDragStart(i)}
                                                        onDragOver={(e) => handleOnDragOver(e, i)}
                                                        onDrop={() => handleOnDrop(i)}
                                                        onDragEnd={() => handleDragEnd()}
                                                    >{userAnswer[i]}</button>

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

export default Lesson3