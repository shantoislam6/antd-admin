import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem, TableListPagination } from './data';
import { addRule, removeRule, rule, updateRule } from './service';

/**
 * Add node
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('Adding');

  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to add. Please try again!');
    return false;
  }
};

/**
 * Update node
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('Configuring');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('Configuration successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed. Please try again!');
    return false;
  }
};

/**
 * Remove node
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully, refreshing soon');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to delete. Please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /** Modal window for creating new node */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  /** Modal window for updating node */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Rule Name',
      dataIndex: 'name',
      tip: 'Rule name is unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'Call Count',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val} million`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Closed',
          status: 'Default',
        },
        1: {
          text: 'Running',
          status: 'Processing',
        },
        2: {
          text: 'Online',
          status: 'Success',
        },
        3: {
          text: 'Exception',
          status: 'Error',
        },
      },
    },
    {
      title: 'Last Scheduled Time',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="Please enter the exception reason!" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: 'Operation',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          Configure
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          Subscribe Alert
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="Query Table"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> New
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              items &nbsp;&nbsp;
              <span>
                Call Count Total {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                million
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Batch Delete
          </Button>
          <Button type="primary">Batch Approve</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="New Rule"
        width="400px"
        open={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Rule name is required',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
