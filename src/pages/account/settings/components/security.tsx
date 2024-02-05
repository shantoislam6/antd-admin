import { List } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">Strong</span>,
  medium: <span className="medium">Medium</span>,
  weak: <span className="weak">Weak</span>,
};

const SecurityView: React.FC = () => {
  const getData = () => [
    {
      title: 'Account Password',
      description: (
        <>
          Current Password Strength:
          {passwordStrength.strong}
        </>
      ),
      actions: [<a key="Modify">Modify</a>],
    },
    {
      title: 'Security Phone',
      description: `Bound Phone: 138****8293`,
      actions: [<a key="Modify">Modify</a>],
    },
    {
      title: 'Security Question',
      description: 'Security question not set. Security questions can effectively protect account security.',
      actions: [<a key="Set">Set</a>],
    },
    {
      title: 'Backup Email',
      description: `Bound Email: ant***sign.com`,
      actions: [<a key="Modify">Modify</a>],
    },
    {
      title: 'MFA Device',
      description: 'MFA device not bound. After binding, secondary confirmation can be performed.',
      actions: [<a key="Bind">Bind</a>],
    },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
