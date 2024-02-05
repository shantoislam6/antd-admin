import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  Dropdown,
  Empty,
  Popover,
  Space,
  Statistic,
  Steps,
  Table,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import type { FC } from 'react';
import React, { Fragment, useState } from 'react';
import type { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';
import useStyles from './style.style';

const { Step } = Steps;
const ButtonGroup = Button.Group;

// Action component
const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Action 1',
                },
                {
                  key: '2',
                  label: 'Action 2',
                },
                {
                  key: '3',
                  label: 'Action 3',
                },
              ],
            }}
            placement="bottomRight"
          >
            Main Action
          </Dropdown.Button>
        );
      }
      return (
        <Space>
          <ButtonGroup>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: 'Option 1',
                  },
                  {
                    key: '2',
                    label: 'Option 2',
                  },
                  {
                    key: '3',
                    label: 'Option 3',
                  },
                ],
              }}
              placement="bottomRight"
            >
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">Main Action</Button>
        </Space>
      );
    }}
  </RouteContext.Consumer>
);

// Operation Tab List
const operationTabList = [
  {
    key: 'tab1',
    tab: 'Operation Log 1',
  },
  {
    key: 'tab2',
    tab: 'Operation Log 2',
  },
  {
    key: 'tab3',
    tab: 'Operation Log 3',
  },
];

// Table columns
const columns = [
  {
    title: 'Operation Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Operator',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Execution Result',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="Success" />;
      }
      return <Badge status="error" text="Rejected" />;
    },
  },
  {
    title: 'Operation Time',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'Memo',
    dataIndex: 'memo',
    key: 'memo',
  },
];

// Advanced component
const Advanced: FC = () => {
  const { styles } = useStyles();

  // Extra content
  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="Status" value="Pending Approval" />
      <Statistic title="Order Amount" value={568.08} prefix="¥" />
    </div>
  );

  // Description content
  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="Creator">Qu Lilili</Descriptions.Item>
          <Descriptions.Item label="Product">XX Service</Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-07-07</Descriptions.Item>
          <Descriptions.Item label="Related Document">
            <a href="">12421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Effective Date">2017-07-07 ~ 2017-08-08</Descriptions.Item>
          <Descriptions.Item label="Remarks">Please confirm within two working days</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  // Steps descriptions
  const desc1 = (
    <div className={classNames(styles.stepDescription)}>
      <Fragment>
        Qu Lilili
        <DingdingOutlined
          style={{
            marginLeft: 8,
          }}
        />
      </Fragment>
      <div>2016-12-12 12:32</div>
    </div>
  );
  const desc2 = (
    <div className={styles.stepDescription}>
      <Fragment>
        Zhou Maomao
        <DingdingOutlined
          style={{
            color: '#00A0E9',
            marginLeft: 8,
          }}
        />
      </Fragment>
      <div>
        <a href="">Remind</a>
      </div>
    </div>
  );

  // State for tab status
  const [tabStatus, setTabStatus] = useState<{
    operationKey: 'tab1' | 'tab2' | 'tab3';
    tabActiveKey: string;
  }>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  // Custom progress dot for Steps component
  const customDot = (
    dot: React.ReactNode,
    {
      status,
    }: {
      status: string;
    },
  ) => {
    const popoverContent = (
      <div
        style={{
          width: 160,
        }}
      >
        Wu Jiahao
        <span
          style={{
            float: 'right',
          }}
        >
          <Badge
            status="default"
            text={
              <span
                style={{
                  color: 'rgba(0, 0, 0, 0.45)',
                }}
              >
                No Response
              </span>
            }
          />
        </span>
        <div
          style={{
            marginTop: 4,
          }}
        >
          Duration: 2 hours 25 minutes
        </div>
      </div>
    );
    if (status === 'process') {
      return (
        <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
          <span>{dot}</span>
        </Popover>
      );
    }
    return dot;
  };

  // Fetching data using useRequest hook
  const { data = {}, loading } = useRequest<{
    data: AdvancedProfileData;
  }>(queryAdvancedProfile);
  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;

  // Content list for different tabs
  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />
    ),
    tab2: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={columns}
      />
    ),
    tab3: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={columns}
      />
    ),
  };

  // Function to handle tab change
  const onTabChange = (tabActiveKey: string) => {
    setTabStatus({
      ...tabStatus,
      tabActiveKey,
    });
  };

  // Function to handle operation tab change
  const onOperationTabChange = (key: string) => {
    setTabStatus({
      ...tabStatus,
      operationKey: key as 'tab1',
    });
  };

  return (
    <PageContainer
      title="Order Number: 234231029431"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      tabList={[
        {
          key: 'detail',
          tab: 'Details',
        },
        {
          key: 'rule',
          tab: 'Rules',
        },
      ]}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            title="Process Progress"
            style={{
              marginBottom: 24,
            }}
          >
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  direction={isMobile ? 'vertical' : 'horizontal'}
                  progressDot={customDot}
                  current={1}
                >
                  <Step title="Create Project" description={desc1} />
                  <Step title="Departmental Review" description={desc2} />
                  <Step title="Financial Review" />
                  <Step title="Complete" />
                </Steps>
              )}
            </RouteContext.Consumer>
          </Card>
          <Card
            title="User Information"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            {/* User Descriptions */}
          </Card>
          <Card
            title="User's Call Records in the Past Six Months"
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Empty />
          </Card>
          <Card bordered={false} tabList={operationTabList} onTabChange={onOperationTabChange}>
            {contentList[tabStatus.operationKey] as React.ReactNode}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default Advanced;
