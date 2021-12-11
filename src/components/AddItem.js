import React, { useRef } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

const AddItem = ({ newItem, setNewItem, submitHandler }) => {
    const inputRef = useRef();
    return (
        <form className='addForm' onSubmit={submitHandler}>
            <label htmlFor='addItem'>Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                arial-label='Add Item'
                onClick={() => inputRef.current.focus()}>
                <AddBoxIcon />
            </button>
        </form>
    );
};

export default AddItem;
