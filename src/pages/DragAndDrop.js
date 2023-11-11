import React, { useState } from 'react'
import "../styles/lesson4.css";
import { BsThreeDotsVertical } from "react-icons/bs";


const DragAndDrop = () => {
    const [sport, setSport] = useState(["B", "A", "D", "C"]);
    const [dragItemIndex, setdragItemIndex] = useState()
    const [dragOverItemIndex, setdragOverItemIndex] = useState();

    function handleOnDragStart(i) {
        console.log(`moving item start from index ${i} to`);
        setdragItemIndex(i)
    }




    function handleOnDragOver(e, i) {
        e.preventDefault()
        
        setdragOverItemIndex(i)
        console.log(`drag  moved item over index ${i} `);
    }

    
    function handleOnDrop(i) {
        console.log(`moved item from ${dragItemIndex} to index ${i}`)
        let removeItem = sport.splice(dragItemIndex, 1);
        sport.splice(i, 0, removeItem[0])
        setSport([...sport]);
    }

    function handleDragEnd() {
        setdragItemIndex(undefined)
        setdragOverItemIndex(undefined)
    }
    function handleSubmit() {
        console.log(sport)
    }
    return (
        <div className='DragAndDrop'>
            <h2>DragAndDrop2</h2>
            <div className='list'>
                {
                    sport.length > 0 && (
                        sport.map((val, i) => (
                            <div key={i} className={`${i === dragOverItemIndex ? "next_list_item" : 'list_item'}`}
                                draggable
                                onDragStart={() => handleOnDragStart(i)}
                                onDragOver={(e) => handleOnDragOver(e, i)}
                                onDrop={() => handleOnDrop(i)}
                                onDragEnd={handleDragEnd}
                            >
                                <span>{i}</span>
                                <span>{val}</span>
                                <BsThreeDotsVertical />
                            </div>
                        ))
                    )
                }

            </div>

            <button onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default DragAndDrop