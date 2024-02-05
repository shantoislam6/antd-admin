import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { categoryOptions } from '../../mock';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType } from './data.d';
import { queryFakeList } from './service';
import useStyles from './style.style';

const FormItem = Form.Item;

const pageSize = 5;

const Articles: FC = () => {
  const [form] = Form.useForm();

  const { styles } = useStyles();

  const { data, reload, loading, loadMore, loadingMore } = useRequest(
    () => {
      return queryFakeList({
        count: pageSize,
      });
    },
    {
      loadMore: true,
    },
  );

  const list = data?.list || [];

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: 'Myself',
    },
    {
      id: 'wjh',
      name: 'Wu Jiahao',
    },
    {
      id: 'zxx',
      name: 'Zhou Xingxing',
    },
    {
      id: 'zly',
      name: 'Zhao Liying',
    },
    {
      id: 'ym',
      name: 'Yao Ming',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const loadMoreDom = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={loadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loadingMore ? (
          <span>
            <LoadingOutlined /> Loading...
          </span>
        ) : (
          'Load More'
        )}
      </Button>
    </div>
  );

  const ownerOptions = useMemo<DefaultOptionType[]>(
    () =>
      owners.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [owners],
  );

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={reload}
        >
          <StandardFormRow title="Category" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions.map((category) => (
                  <TagSelect.Option value={category.value!} key={category.value}>
                    {category.label}
                  </TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="Owner" grid>
            <FormItem name="owner" noStyle>
              <Select
                mode="multiple"
                placeholder="Select owner"
                style={{ minWidth: '6rem' }}
                options={ownerOptions}
              />
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              Only see my own
            </a>
          </StandardFormRow>
          <StandardFormRow title="Other options" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Active Users" name="user">
                  <Select
                    placeholder="Any"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: 'Lisa',
                        value: 'lisa',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Good Ratings" name="rate">
                  <Select
                    placeholder="Any"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: 'Excellent',
                        value: 'good',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<ListItemDataType>
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMoreDom}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.star} />,
                <IconText key="like" type="like-o" text={item.like} />,
                <IconText key="message" type="message" text={item.message} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.href}>
                    {item.title}
                  </a>
                }
                description={
                  <span>
                    <Tag>Ant Design</Tag>
                    <Tag>Design Language</Tag>
                    <Tag>Ant Financial</Tag>
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Articles;
