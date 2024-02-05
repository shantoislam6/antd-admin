import {
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Card, message } from 'antd';
import type { FC } from 'react';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';
const BasicForm: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted successfully');
    },
  });
  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };
  return (
    <PageContainer content="The form page is used to collect or verify information from users. Basic forms are common in scenarios where there are few data items to be filled in.">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title',
              },
            ]}
            placeholder="Give a name to the target"
          />
          <ProFormDateRangePicker
            label="Start and end date"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select start and end dates',
              },
            ]}
            placeholder={['Start date', 'End date']}
          />
          <ProFormTextArea
            label="Target description"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'Please enter a target description',
              },
            ]}
            placeholder="Please enter your phase work goal"
          />

          <ProFormTextArea
            label="Measurement standard"
            name="standard"
            width="xl"
            rules={[
              {
                required: true,
                message: 'Please enter the measurement standard',
              },
            ]}
            placeholder="Please enter the measurement standard"
          />

          <ProFormText
            width="md"
            label={
              <span>
                Client
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            tooltip="The service object of the target"
            name="client"
            placeholder="Please describe the client you serve, directly @ name/employee ID for internal clients"
          />

          <ProFormText
            width="md"
            label={
              <span>
                Invited reviewer
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            name="invites"
            placeholder="Please @ name/employee ID directly, up to 5 people can be invited"
          />

          <ProFormDigit
            label={
              <span>
                Weight
                <em className={styles.optional}>(Optional)</em>
              </span>
            }
            name="weight"
            placeholder="Please enter"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => Number(value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: 'Public',
              },
              {
                value: '2',
                label: 'Partially public',
              },
              {
                value: '3',
                label: 'Private',
              },
            ]}
            label="Target visibility"
            help="Customers and invited reviewers are shared by default"
            name="publicType"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: 'Colleague A',
                    },
                    {
                      value: '2',
                      label: 'Colleague B',
                    },
                    {
                      value: '3',
                      label: 'Colleague C',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
