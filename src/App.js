import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';
import Search from 'components/Search';

function App() {
    const [items, setItems] = useState(
        //Even after server is stopped, list will stay there. This is great.
        // Using || or so that when items is empty its not null. It will throw error if items array is null.
        JSON.parse(localStorage.getItem('shoppinglist') || [])
    );

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');

    //We want to run a function everytime there is change in items array. We can do that by using useEffect
    // useEffect takes function and array, two arguments
    useEffect(() => {
        localStorage.setItem('shoppinglist', JSON.stringify(items));
    }, [items]);

    const addItem = (item) => {
        //Our items has id, checked and items properties.
        // Items in array are objects that contains id, checked and items
        //Don't get confused here, I took lots of time here to figure out.
        const id = items.length ? items[items.length - 1].id + 1 : 1; // This is creating id for the object
        const myNewItem = { id, checked: false, item }; //This is creating new objects
        const listItems = [...items, myNewItem]; //Adding new object to array
        setItems(listItems); //Setting new item to list in local storage
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
        setNewItem('');
    };

    return (
        <div className='App'>
            <Header title={'Groceries List'} />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                submitHandler={onSubmitHandler}
            />
            <Search search={search} setSearch={setSearch} />
            <Content
                items={items.filter((item) =>
                    item.item.toLowerCase().includes(search.toLocaleLowerCase())
                )}
                onCheck={onCheckHandler}
                onDelete={onDeleteHandler}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
