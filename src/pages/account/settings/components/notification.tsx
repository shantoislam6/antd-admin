import { List, Switch } from 'antd';
import React, { Fragment } from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const NotificationView: React.FC = () => {
  const getData = () => {
    const Action = <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />;
    return [
      {
        title: 'Account Password',
        description: 'Notifications from other users will be sent as site messages',
        actions: [Action],
      },
      {
        title: 'System Messages',
        description: 'System messages will be sent as site messages',
        actions: [Action],
      },
      {
        title: 'To-Do Tasks',
        description: 'To-do tasks will be sent as site messages',
        actions: [Action],
      },
    ];
  };

  const data = getData();
  return (
    <Fragment>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;
