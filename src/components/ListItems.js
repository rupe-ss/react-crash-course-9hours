import React from 'react';
import LineItem from 'components/LineItem';

const ListItems = ({ items, onCheck, onDelete }) => {
    return (
        <ul>
            {items.map((item) => (
                <LineItem item={item} onCheck={onCheck} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default ListItems;
