import { useState } from 'react';
import './App.css';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';

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

    const [newItem, setNewItem] = useState('');

    const addItem = (item) => {
        //Our items has id, checked and items properties.
        // Items in array are objects that contains id, checked and items
        const id = items.length ? items[items.length - 1].id + 1 : 1; // This is creating id for the object
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
    };

    const onCheckHandler = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
        //localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    };

    const onDeleteHandler = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        //localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
    };

    console.log(items);

    return (
        <div className='App'>
            <Header title={'Groceries List'} />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                submitHandler={onSubmitHandler}
            />
            <Content
                items={items}
                onCheck={onCheckHandler}
                onDelete={onDeleteHandler}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
