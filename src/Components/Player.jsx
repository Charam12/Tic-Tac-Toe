import { useState } from "react";

export default function Player({ intialName, symbol, isActive}) {
    const [ playerName, setPlayerName ] = useState(intialName);
    const [ isEditing, setIsEditing ] = useState(false); 

    function handleEdit() {
        setIsEditing((editing) => !editing)
    }
    function handleChange(Event) {
        setPlayerName(Event)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={(Event => handleChange(Event.target.value))}/>
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEdit()}>{isEditing ? "Save": "Edit"}</button>
        </li>
    )
}