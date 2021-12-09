import { useState } from 'react';
import './App.css';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';

function App() {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: 'One half pound bag of Cocoa Covered Almonds Unsalted',
        },
        {
            id: 2,
            checked: false,
            item: 'Item 2',
        },
        {
            id: 3,
            checked: false,
            item: 'Item 3',
        },
    ]);

    const onChangeHandler = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    };

    const onDeleteHandler = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    };

    return (
        <div className='App'>
            <Header />
            <Content
                items={items}
                onChange={onChangeHandler}
                onDelete={onDeleteHandler}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
