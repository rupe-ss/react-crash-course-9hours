import React from 'react';

import 'index.css';
import ListItems from 'components/ListItems';

const Content = ({ items, onCheck, onDelete }) => {
    return (
        <main>
            {items.length ? (
                <ListItems
                    items={items}
                    onCheck={onCheck}
                    onDelete={onDelete}
                />
            ) : (
                <p style={{ marginTop: '2rem' }}> Your list is empty</p>
            )}
        </main>
    );
};

export default Content;
