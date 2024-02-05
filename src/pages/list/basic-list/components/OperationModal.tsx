import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import type { FC } from 'react';
import type { BasicListItemDataType } from '../data.d';
import useStyles from '../style.style';

type OperationModalProps = {
  done: boolean;
  open: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  children?: React.ReactNode;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { styles } = useStyles();
  const { done, open, current, onDone, onSubmit, children } = props;

  if (!open) {
    return null;
  }

  return (
    <ModalForm<BasicListItemDataType>
      open={open}
      title={done ? null : `Task ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done
          ? {
              padding: '72px 0',
            }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="title"
            label="Task Name"
            rules={[
              {
                required: true,
                message: 'Please input task name',
              },
            ]}
            placeholder="Please input"
          />
          <ProFormDateTimePicker
            name="createdAt"
            label="Start Time"
            rules={[
              {
                required: true,
                message: 'Please select start time',
              },
            ]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="Please select"
          />
          <ProFormSelect
            name="owner"
            label="Task Owner"
            rules={[
              {
                required: true,
                message: 'Please select task owner',
              },
            ]}
            options={[
              {
                label: 'Fu Xiaoxiao',
                value: 'xiao',
              },
              {
                label: 'Zhou Maomao',
                value: 'mao',
              },
            ]}
            placeholder="Please select administrator"
          />
          <ProFormTextArea
            name="subDescription"
            label="Product Description"
            rules={[
              {
                message: 'Please enter at least five characters for product description!',
                min: 5,
              },
            ]}
            placeholder="Please enter at least five characters"
          />
        </>
      ) : (
        <Result
          status="success"
          title="Success"
          subTitle="A series of information descriptions, very short, can also bring punctuation."
          extra={
            <Button type="primary" onClick={onDone}>
              Got it
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;
