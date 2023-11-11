import React, { useState } from 'react'
import "../styles/lesson3.css";

const img_arr = [
    "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
    "https://cdn-icons-png.flaticon.com/128/482/482216.png",
]

const DragAndDrop2 = () => {
    const [options, setoptions] = useState(["PDF", "CSS", "HTML"]);
    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

    function handleOnDragStart(i) {
        console.log(` moving item start from index ${i} to`);
        setdragItemIndex(i)
    }



   
    function handleOnDragOver(e, i) {
        e.preventDefault()
        setdragOverItemIndex(i)
        console.log(`drag  moved item over index ${i} `);
    }

  
    function handleOnDrop(i) {//it capture drag over index
        console.log(`moved item from ${dragItemIndex} to index ${i}`)
        let removeItem = options.splice(dragItemIndex, 1);
        options.splice(i, 0, removeItem[0])
        setoptions([...options]);
    }

    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }
    function handleSubmit() {
        console.log(options)
    }
    return (
        <div className='DragAndDrop2'>
            <h2>DragAndDrop2</h2>
            <div className='table'>

                {
                    options.map((val, i) => (
                        <div className='table_item' key={val}>

                            <div className='img-cont'>
                                <img src={img_arr[i]}  alt='optional img'/>
                            </div>
                            <button
                                className={`${i === dragOverItemIndex ? "next_btn" : ""}`}
                                draggable
                                onDragStart={() => handleOnDragStart(i)}
                                onDragOver={(e) => handleOnDragOver(e, i)}
                                onDrop={() => handleOnDrop(i)}
                                onDragEnd={() => handleDragEnd()}
                            >{options[i]}</button>

                        </div>
                    ))
                }

            </div>

            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default DragAndDrop2



