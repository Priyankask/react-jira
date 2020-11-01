import React, { useState } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data } from "../data";

const Homepage = () => {
    const [items, setItems] = useState(data);
    const [dragEl, setDragEl] = useState(null);

    const onDrop = (item, status) => {
        if (item.status === status) {
            return;
        }

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status });
            return [ ...newItems ];
        });
    };

    const moveItem = el => {
        setItems(prevState => {
            const itemIndex = prevState.findIndex(i => i.content === dragEl.content);
            const hoverIndex = prevState.findIndex(i => i.content === el);
            const newState = [ ...prevState ];

            newState.splice(itemIndex, 1);
            newState.splice(hoverIndex, 0, dragEl);
            return [ ...newState ];
        });
    };

    const setDragElement = el => setDragEl(el);


    return (
        <div className={"row"}>
            {["open", "C1", "C2", "C3"].map(status => {
                return (
                    <div key={status} className={"col-wrapper"}>
                        <div className={"col-group"}>
                            <h5 className={"col-header"}>{status.toUpperCase()}</h5>
                        </div>
                        <DropWrapper onDrop={onDrop} status={status}>
                            <Col>
                                {items
                                    .filter(i => i.status === status)
                                    .map(i => (
                                        <Item
                                            key={i.id}
                                            item={i}
                                            moveItem={moveItem}
                                            setDragElement={setDragElement}
                                        />
                                    ))
                                }
                                
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    );
};

export default Homepage;