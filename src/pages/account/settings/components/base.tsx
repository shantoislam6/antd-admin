import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Input, message, Upload } from 'antd';
import React from 'react';
import { queryCity, queryCurrent, queryProvince } from '../service';
import useStyles from './index.style';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

const BaseView: React.FC = () => {
  const { styles } = useStyles();

  // Avatar component for easy independent use and adding features like cropping in the future
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>Avatar</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            Change Avatar
          </Button>
        </div>
      </Upload>
    </>
  );

  // Get current user information
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  // Get avatar URL
  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  // Handle form submission
  const handleFinish = async () => {
    message.success('Successfully updated basic information');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: 'Update Basic Information',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="Nickname"
                rules={[
                  {
                    required: true,
                    message: 'Please input your nickname!',
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="Profile"
                rules={[
                  {
                    required: true,
                    message: 'Please input your profile!',
                  },
                ]}
                placeholder="Profile"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="Country/Region"
                rules={[
                  {
                    required: true,
                    message: 'Please input your country or region!',
                  },
                ]}
                options={[
                  {
                    label: 'China',
                    value: 'China',
                  },
                ]}
              />

              <ProForm.Group title="Province/City" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: 'Please input your province!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your city!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }
                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="Street Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your street address!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="Contact Phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your contact phone!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
