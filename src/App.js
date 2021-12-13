import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';
import Search from 'components/Search';

function App() {
    //Removing localStorage function and making state empty array
    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    //State to catch a error message
    const [fetchError, setFetchError] = useState(null);

    //Adding jsonServer url in a const
    const API_URL = 'http://localhost:5000/items';

    //We want to run a function everytime there is change in items array. We can do that by using useEffect
    // useEffect takes function and array, two arguments
    useEffect(() => {
        //we can't do async above like useEffect( async() => {};
        //Since we can't async we will make a async function
        const fetchItems = async () => {
            // Adding try catch method as well
            try {
                //fetch function will give a response, fetch is a await function
                //we can do .then function since fetch is await function
                const response = await fetch(API_URL);

                //checking if response is okay
                //If error is thrown and setting error message as well
                //If error is thrown it will go to catch
                if (!response.ok) throw Error("Didn't recieve expected data");
                // If response is okay then,
                // Changing json response to JavaScript Object
                const listItems = await response.json();
                //Updating local state
                setItems(listItems);
                //Once set is done updating error message as null;
                setFetchError(null);
                //Create a state to store a catch message
            } catch (err) {
                //Updating state with error message
                setFetchError(err.message);
            }
        };
        fetchItems();
    }, []);

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
