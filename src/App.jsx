import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [botCollections, setBotCollections] = useState([]);
    const [myBotArmy, setmyBotArmy] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/bots')
            .then(res => res.json())
            .then(data => {
                setBotCollections(data);
            })
            .catch(() => console.error("Could not fetch bots"));
    }, []);

    const addToArmy = (bot) => {
        setmyBotArmy(original => {
            const alreadyInArmy = original.find(item => item.id === bot.id);
            return alreadyInArmy ? original : [...original, bot];
        });
    };

    const handleRemoveFromCollection = (botId) => {
        setBotCollections(original => original.filter(bot => bot.id !== botId));
        setmyBotArmy(original => original.filter(bot => bot.id !== botId));
    };

    const removebot = (botId) => {
        setmyBotArmy(original => original.filter(bot => bot.id !== botId));
    };

    return (
        <>
            <h1>Welcome to <strong>Bot Battlr</strong></h1>
            <div className="main">
                <div className="container">
                    {botCollections.map(bot => {
                        return (
                            <div onClick={() => addToArmy(bot)} className="box" key={bot.id}>
                                <img src={bot.avatar_url} alt="bot image" />
                                <h3>Name: {bot.name}</h3>
                                <p>Health: {bot.health}</p>
                                <p>Damage: {bot.damage}</p>
                                <p>Class: {bot.bot_class}</p>
                                <p>Armor: {bot.armor}</p>
                                <p onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFromCollection(bot.id);
                                }}>✖️</p>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h2>My Bots</h2>
                    <div className="container">
                        {myBotArmy.map(bot => (
                            <div onClick={(e) => {
                                e.stopPropagation(); 
                                removebot(bot.id); 
                            }} className="box" key={bot.id}>
                                <img  src={bot.avatar_url} alt="bot image" />
                                <h3>Name: {bot.name}</h3>
                                <p>Health: {bot.health}</p>
                                <p>Damage: {bot.damage}</p>
                                <p>Class: {bot.bot_class}</p>
                                <p>Armor: {bot.armor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;


