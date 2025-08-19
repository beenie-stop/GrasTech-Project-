import React, { useState } from 'react';
import '../css/affirmation.css'
export default function Affirmation() {
    const affirmations = [
        "You are capable of amazing things! 💪",
        "Believe in yourself and all that you are.",
        "Every day is a fresh start.",
        "You are stronger than your challenges.",
        "Small steps every day lead to big changes.",
        "Progress, not perfection.",
        "You have the power to create change.",
        "Keep going, you’re doing great!",
    ];

    
    const [randomIndex, setRandomIndex] = useState(() =>
        Math.floor(Math.random() * affirmations.length)
    );

   
    const [likes, setLikes] = useState(Array(affirmations.length).fill(0));

   
    function showNewAffirmation() {
        const index = Math.floor(Math.random() * affirmations.length);
        setRandomIndex(index);
    }

  
    function likeCurrentAffirmation() {
        const updatedLikes = [...likes];
        updatedLikes[randomIndex] += 1;
        setLikes(updatedLikes);
    }

    return (
        <div className="affirmation-page">
            <h2>Affirmation to Brighten Your Day</h2>
            <p>{affirmations[randomIndex]}</p>

            <div className="affirmation-buttons">
                <button onClick={showNewAffirmation}>New Affirmation</button>
                <button onClick={likeCurrentAffirmation}>Like</button>
            </div>

            <div className="affirmation-likes">
                <p>Likes: {likes[randomIndex]}</p>
            </div>
        </div>

    );
}
