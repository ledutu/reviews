import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { RelativeCardTitle, SideBar } from "../components";
import RelativeCardChild from "../components/card/relative-card-child/relative-card-child";

function Test() {

    const datas = [
        {
            title: 'Le Duc Tung Le Duc Tung Le Duc Tung',
            image: 'https://picsum.photos/300/200?random=2',
        },
        {
            title: 'Le Duc Tung Le Duc Tung Le Duc Tung 2',
            image: 'https://picsum.photos/108/72?random=2',
        },
    ]

    const handleOnItemClick = item => {
        console.log(item);
    }

    return (
        <div className="mt-20 mb-40">
            <SideBar
                data={datas}
                title="Đánh giá gần đây"
                onItemClick={handleOnItemClick}
            />
        </div>
    );
}

export default Test;
