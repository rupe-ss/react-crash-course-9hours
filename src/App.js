import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Content from 'components/Content';
import Footer from 'components/Footer';
import AddItem from 'components/AddItem';
import Search from 'components/Search';
import { colRefForGroceries } from 'dbconfig';

import { addDoc, onSnapshot } from 'firebase/firestore';
import { deleteItem } from 'dbconfig';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            onSnapshot(colRefForGroceries, (snapshot) => {
                if (!snapshot.docs) throw Error("Didn't recieve expected data");
                const groceryLists = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                console.log(groceryLists);
                setItems(groceryLists);
                setFetchError(null);
            });
        } catch (err) {
            setFetchError(err.message);
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addItem = async (item) => {
        try {
            const myNewItem = { checked: false, item }; //This is creating new objects
            const response = await addDoc(colRefForGroceries, myNewItem);
            if (!response.id)
                throw Error('Fail to add a item in Groceries List');
            console.log(response);
        } catch (error) {
            setFetchError(error.message);
            console.log(error.message);
        }
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
