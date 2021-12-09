import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import 'index.css';

const Content = ({ items, onChange, onDelete }) => {
    return (
        <main className='main'>
            <ul>
                {items.map((item) => (
                    <li className='item' key={item.id}>
                        <input
                            type='checkbox'
                            checked={item.checked}
                            onChange={() => onChange(item.id)}></input>
                        <label onDoubleClick={() => onChange(item.id)}>
                            {item.item}
                        </label>
                        <DeleteIcon
                            role='button'
                            tabIndex='0'
                            onClick={() => onDelete(item.id)}
                        />
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Content;
