import React from 'react';
import LineItem from 'components/LineItem';

const ListItems = ({ items, onCheck, onDelete }) => {
    return (
        <ul>
            {items.map((item) => (
                <LineItem
                    item={item}
                    onCheck={onCheck}
                    onDelete={onDelete}
                    key={item.id}
                />
            ))}
        </ul>
    );
};

export default ListItems;
