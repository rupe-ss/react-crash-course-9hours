import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';
import Search from 'components/Search';
import { colRef } from 'dbconfig';

import { getDocs, addDoc } from 'firebase/firestore';
import { deleteItem } from 'dbconfig';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
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
        };
        fetchData();
    }, []);

    const addItem = async (item) => {
        const myNewItem = { checked: false, item }; //This is creating new objects
        const response = await addDoc(colRef, myNewItem);
        const myNewItemWithId = { ...myNewItem, id: response.id };
        const listItems = [...items, myNewItemWithId]; //Adding new object to array
        console.log(listItems);
        setItems(listItems); //Setting new item to list in local storage
    };

    const onCheckHandler = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
    };

    const onDeleteHandler = (id) => {
        deleteItem(id);
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
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
