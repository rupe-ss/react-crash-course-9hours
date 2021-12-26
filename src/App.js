import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';
import Search from 'components/Search';
import { colRef } from 'dbconfig';

import { getDocs } from 'firebase/firestore';

function App() {
    //Removing localStorage function and making state empty array
    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    //State to catch a error message
    const [fetchError, setFetchError] = useState(null);
    //State to store isLoading boolean value true
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let listItems = [];
            try {
                const snapshot = await getDocs(colRef);
                if (!snapshot.docs) throw Error("Didn't recieve expected data");
                snapshot.docs.forEach((doc) => {
                    listItems.push({ ...doc.data(), id: doc.id });
                });
                setItems(listItems);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
                console.log(err.message);
            } finally {
                setIsLoading(false);
            }
            console.log(listItems);
        };
        fetchData();
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
            <main>
                {isLoading && <p>Loading Items ...</p>}
                {fetchError && (
                    <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
                )}
                {/* Only show content if fetchError is null. */}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) =>
                            item.item
                                .toLowerCase()
                                .includes(search.toLocaleLowerCase())
                        )}
                        onCheck={onCheckHandler}
                        onDelete={onDeleteHandler}
                    />
                )}
            </main>
            <Footer length={items.length} />
        </div>
    );
}

export default App;
