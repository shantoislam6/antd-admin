import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Fragment } from 'react';

const BindingView: React.FC = () => {
  const getData = () => [
    {
      title: 'Bind Taobao',
      description: 'Currently not bound to Taobao account',
      actions: [<a key="Bind">Bind</a>],
      avatar: <TaobaoOutlined className="taobao" />,
    },
    {
      title: 'Bind Alipay',
      description: 'Currently not bound to Alipay account',
      actions: [<a key="Bind">Bind</a>],
      avatar: <AlipayOutlined className="alipay" />,
    },
    {
      title: 'Bind DingTalk',
      description: 'Currently not bound to DingTalk account',
      actions: [<a key="Bind">Bind</a>],
      avatar: <DingdingOutlined className="dingding" />,
    },
  ];

  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default BindingView;
