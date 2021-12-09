import { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    const onClickHandler = () => {
        // setCount(count + 1);
        // setCount(count + 1);
        setCount((prevState) => prevState + 1);
        setCount((prevState) => prevState + 1);
        console.log(count);
    };

    const onClickHandler1 = () => {
        setCount((prevState) => prevState - 1);
    };

    return (
        <div className='App'>
            Hello World
            <button onClick={onClickHandler}>+</button>
            <button onClick={onClickHandler1}>-</button>
        </div>
    );
}

export default App;
