import { useState } from 'react'
import "../styles/lesson.css"
import "../styles/lesson2.css"
import { BsArrowLeft, BsArrowRight, BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import err_audio from "../asset/err_tone.mp3";
import win_audio from "../asset/success_tone.mp3";
import { toast } from 'react-toastify';
import { questionOfLession2 } from '../asset/data';



const Lesson2 = () => {

    const [index, setIndex] = useState(0)
    const [questionOfLession, setQuestionOfLession] = useState(() => {
        if (localStorage.getItem("questionOfLession2")) {
            return JSON.parse(localStorage.getItem("questionOfLession2"));
        } else {
            return questionOfLession2
        }
    });

    const [userAnswer, setUserAnswer] = useState(() => {
        if (localStorage.getItem("questionOfLession2")) {
            let questionOfLession2 = JSON.parse(localStorage.getItem("questionOfLession2"));
            return questionOfLession2[0].userAnswer
        } else {
            return questionOfLession2[0].userAnswer//from global arr
        }
    });


    
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("questionOfLession2")) || questionOfLession2;
   
    const storeDataInLocalStorage = (questionOfLession2) => localStorage.setItem("questionOfLession2", JSON.stringify(questionOfLession2));

    function handleCheck(currobj) {

        console.log("rin1", userAnswer)

        for (let i = 0; i < Object.values(userAnswer).length; i++) {
            let val = Object.values(userAnswer)[i];
            if (!val) {
                toast.warn(`Pease fill the ${i > 0 ? "all" : ""} input`, {}); return;
            }
        }


        if (currobj.noOfAttempt <= 0) {
            toast.error("number of attempts exceeded!", {}); return;
        }

        let questionOfLession2 = getDataFromLocalStorage()
        if (questionOfLession2[0].isSubmit) {//if quiz have submit and user click again before reset the quiz
            toast.info("Please reset the quiz to start again", {}); return;
        }

        questionOfLession2 = questionOfLession2.map((obj) => {
            if (obj.qId === currobj.qId) {
                return {
                    ...currobj,
                    qStatus: evaluateuserAnswer(currobj.correctAnswer, userAnswer) ? "correct" : "incorrect",
                    noOfAttempt: currobj.noOfAttempt - 1,
                    userAnswer: { ...userAnswer },
                }
            } else {
                return obj
            }
        })

        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)

        console.log(currobj.correctAnswer.join(), Object.values(userAnswer).join())
        if (currobj.correctAnswer.join() === Object.values(userAnswer).join()) {
            new Audio(win_audio).play()
        } else {
            new Audio(err_audio).play()
        }
    }

    function handleFlag(currobj) {
        let questionOfLession2 = getDataFromLocalStorage();
        questionOfLession2 = questionOfLession2.map((obj) => {
            if (obj.qId === currobj.qId) {
                return { ...obj, isFlag: obj.isFlag === true ? false : true };//toggle isFlag
            } else {
                return obj
            }
        })
        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)
    }

    function handlePreviousClick() {
        let questionOfLession2 = getDataFromLocalStorage();
        if (questionOfLession2[index].isSubmit) {
            setUserAnswer(questionOfLession2[index - 1].userAnswer)
            setIndex(index - 1); return;
        }

        let i = index;
        while (--i >= 0) {
            if (questionOfLession2[i].isFlag) {
                setIndex(i)
                setUserAnswer(questionOfLession2[i].userAnswer)
                return;
            }
        }

        toast.warn("You can only visit previous when you bookmark the question!")
    }

    function handleNextClick() {
        let questionOfLession2 = getDataFromLocalStorage();
        if (questionOfLession2[index].isSubmit) {
            setUserAnswer(questionOfLession2[index + 1].userAnswer)
            setIndex(index + 1); return;
        }

        let i = index;
        console.log(i)
        while (++i < questionOfLession2.length) {
            if (questionOfLession2[i].isFlag || questionOfLession2[i].isVisited === false) {
                setIndex(i)
                setUserAnswer(questionOfLession2[i].userAnswer)
                break
            }
        }
        questionOfLession2[index].isVisited = true
        storeDataInLocalStorage(questionOfLession2);
    }

    function handleSubmitQuiz() {
        let questionOfLession2 = getDataFromLocalStorage();
        questionOfLession2 = questionOfLession2.map((obj) => {
            return {
                ...obj, isFlag: false,
                isVisited: false, qStatus: "notAttempt", isSubmit: true,
            }
        })
        storeDataInLocalStorage(questionOfLession2);
        setQuestionOfLession(questionOfLession2)
        setIndex(0)
        setUserAnswer({ ...questionOfLession2[0].userAnswer })
        toast.info("Check Your Answer!", {})
    }

    function handleResetQuiz() {
        localStorage.removeItem("questionOfLession2");
        console.log(questionOfLession2);
        setQuestionOfLession(questionOfLession2)//from const variable 
        setIndex(0)
        setUserAnswer({ ...questionOfLession2[0].userAnswer })
    }

    function handleCheckUserOnChange(key, val) {
        // console.log(key, val)
        userAnswer[key] = val;
        setUserAnswer({ ...userAnswer })
        console.log("userAnswer12", userAnswer)

    }

    function evaluateuserAnswer(correctAnswer, userAnswer) {
        userAnswer = Object.values(userAnswer)
        if (correctAnswer.join(",") !== userAnswer.join(",").toLowerCase()) {
            return false
        } else {
            return true
        }
    }



    return (
        <div className='lesson lesson2'>
            <div className='box-cont'>

                {
                    questionOfLession.length > 0 && questionOfLession.map((obj) => {
                        return <div className="box" key={`2-${obj.qId}`} style={{ transform: `translateX(-${index}00%)` }} >
                            <div className='equation'>
                                <h3>{`Q${obj.qId}.`} <span style={{ marginLeft: "20px" }}>Fill in The Blank.</span></h3>
                                <div className='flag_cont' onClick={() => handleFlag(obj)}>
                                    {obj.isFlag === 1 ? <BsBookmarkCheckFill /> : <BsBookmark />}
                                    <span>flag for later</span></div>
                            </div>

                            <div className='mid-part'>




                                <div className='mid_left'>


                                    <div className='options'>
                                        <span>Options:</span>  {"["}
                                        {
                                            obj.options.map((opt, i) => (
                                                <>
                                                    {i !== 0 ? "/" : ""}
                                                    <span key={i}>{opt}</span>
                                                </>
                                            ))
                                        }
                                        {"]"}
                                    </div>
                                    {console.log(Object.values(userAnswer))}
                                    <div className='fillBlnkquestion'>
                                        {

                                            obj.equation.split("").map((ch, i) => (
                                                (ch === "_" || ch === "-" || ch === "*") ?
                                                    (<input key={i} type="text" value={Object.values(userAnswer)[ch === "_" ? 0 : (ch === "-") ? 1 : 2]} onChange={(e) => {
                                                        handleCheckUserOnChange(Object.keys(userAnswer)[ch === "_" ? 0 : (ch === "-") ? 1 : 2], e.target.value)
                                                    }} />)
                                                    : (ch)
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
                                    <span> Note:Congratulations! The answer provided is {Object.values(obj.userAnswer).join(",")} for this question is correct</span>
                                </div>
                            }

                            {obj.qStatus === "incorrect" &&
                                <div className='incorrect-ans'>
                                    <FiAlertCircle />
                                    <span>Note:Your answer provided is {Object.values(obj.userAnswer).join(",")} and it is incorrect</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className={`${obj.correctAnswer.join(",") === Object.values(obj.userAnswer).join(",") ? "correct-ans" : "incorrect-ans"}`}>
                                    {obj.correctAnswer.join() === Object.values(obj.userAnswer).join() ? <FiCheck /> : <FiAlertCircle />}
                                    <span>{Object.values(obj.userAnswer).join("") !== "" ? `Your Ans: ${Object.values(obj.userAnswer).join(" , ")}` : "You did not provide any answer!"}</span>
                                </div>
                            }

                            {obj.isSubmit &&
                                <div className='correct-ans'>
                                    <FiCheck />
                                    <span>Correct Ans: {obj.correctAnswer.join(" , ")}</span>
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

export default Lesson2