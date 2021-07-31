import { Card } from 'antd';
import Image from 'next/image';
import React from 'react';
import styles from './relative-card-title.module.scss';
import PropTypes from 'prop-types';
import { CONFIG } from '../../../constants';

export const RelativeCardTitle = (props) => {
    return (
        <Card
            style={{ width: 300 }}
            className={styles.container}
            bodyStyle={{ padding: 0 }}
            {...props}
        >
            <Image
                alt="example"
                src={CONFIG.BASE_URL + props.data.image}
                width="300"
                height="200"
                layout="fixed"
                className="border-5"
            />
            <h3 className="f-bold f-size-18">{props.data.title}</h3>
        </Card>
    );
}

RelativeCardTitle.defaultProps = {
    title: '',
    image: '',
}

RelativeCardTitle.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
};


