import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const LineItem = ({ item, onDelete, onCheck }) => {
    return (
        <li className='item'>
            <input
                type='checkbox'
                checked={item.checked}
                onChange={() => onCheck(item.id)}></input>
            <label onDoubleClick={() => onCheck(item.id)}>{item.item}</label>
            <DeleteIcon
                role='button'
                tabIndex='0'
                onClick={() => onDelete(item.id)}
            />
        </li>
    );
};

export default LineItem;
