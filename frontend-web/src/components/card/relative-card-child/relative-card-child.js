import { Card } from 'antd';
import Image from 'next/image';
import React from 'react';
import { CONFIG } from '../../../constants';
import styles from './relative-card-child.module.scss';

export const RelativeCardChild = (props) => {
    return (
        <Card
            className={styles.container}
            bodyStyle={{ padding: 0 }}
            {...props}
        >
            <div className="flex-row">
                <div style={{ width: '108px', height: '72px' }}>
                    <Image
                        alt={props.data.title}
                        src={CONFIG.BASE_URL + props.data.image}
                        width={108}
                        height={72}
                        layout="fixed"
                        className="border-5"
                    />
                </div>
                <h3
                    className="f-bold ml-10 f-size-16 text-three-dot-height"
                    style={{ height: '70px' }}
                >{props.data.title} {props.data.title}</h3>
            </div>
        </Card>
    );
}