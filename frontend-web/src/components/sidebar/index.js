import React from "react";
import { RelativeCardTitle, RelativeCardChild } from "../card";
import styles from "./Sidebar.module.scss";
import PropTypes from 'prop-types';
import { Skeleton, Space } from "antd";

export function SideBar({ title, data, color, onItemClick, isLoading, ...rest }) {
  return (
    <div {...rest}>
      {
        isLoading ? (
          <div style={{ width: '300px' }}>
            <Skeleton.Image active style={{ width: '300px', height: '200px' }} />
            <Skeleton paragraph={{ rows: 1, width: 300 }} active />

            <Space className="mt-10">
              <Skeleton.Image active style={{ width: '108px', height: '72px' }} />
              <Skeleton paragraph={{ rows: 1, width: '180px' }} active />
            </Space>

            <Space className="mt-10">
              <Skeleton.Image active style={{ width: '108px', height: '72px' }} />
              <Skeleton paragraph={{ rows: 1, width: '180px' }} active />
            </Space>

            <Space className="mt-10">
              <Skeleton.Image active style={{ width: '108px', height: '72px' }} />
              <Skeleton paragraph={{ rows: 1, width: '180px' }} active />
            </Space>
          </div>
        ) : (
          <div style={{ width: '300px' }} >
            <h1 className="f-bold f-size-18" style={{ color, textTransform: 'uppercase' }}>{title}</h1>
            <RelativeCardTitle
              data={data[0]}
              onClick={() => onItemClick(data[0])}
            />
            <div className="mt-10">
              {
                data.slice(1).map((item, index) => (
                  <div className="mt-20" key={index}>
                    <RelativeCardChild
                      data={item}
                      onClick={() => onItemClick(item)}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
}

SideBar.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  color: PropTypes.string,
  onItemClick: PropTypes.func,
};

SideBar.defaultProps = {
  color: '#333333',
}
