import { history, Link, useRequest } from '@umijs/max';
import { Button, Col, Form, Input, message, Popover, Progress, Row, Select, Space } from 'antd';
import type { Store } from 'antd/es/form/interface';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { StateType } from './service';
import { fakeRegister } from './service';
import useStyles from './style.style';

const FormItem = Form.Item;
const { Option } = Select;

// Password strength indicator mapping
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register: FC = () => {
  const { styles } = useStyles();
  const [count, setCount]: [number, any] = useState(0);
  const [open, setOpen]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;

  // Password status mapping for display
  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>Strength: Strong</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>Strength: Medium</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>Strength: Weak</span>
      </div>
    ),
  };

  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval); // Clear interval when component unmounts
    },
    [interval],
  );

  // Function to start countdown for getting captcha
  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        clearInterval(interval); // Clear interval when countdown reaches 0
      }
    }, 1000);
  };

  // Function to determine password strength status
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  // Request for registration
  const { loading: submitting, run: register } = useRequest<{
    data: StateType;
  }>(fakeRegister, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('Registration successful!'); // Display success message
        history.push({
          pathname: `/user/register-result?account=${params[0].email}`,
        }); // Redirect to registration result page
      }
    },
  });

  // Handle form submission
  const onFinish = (values: Store) => {
    register(values); // Call the register function with form values
  };

  // Validator for confirming password
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The two passwords that you entered do not match!');
    }
    return promise.resolve();
  };

  // Validator for checking password strength and match
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    if (!value) {
      setOpen(!!value);
      return promise.reject('Please enter your password!');
    }
    if (!open) {
      setOpen(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  // Function to change phone number prefix
  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  // Render password strength indicator
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>Register</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'The input is not valid email!',
            },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </FormItem>
        <Popover
          content={
            open && (
              <div>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div>
                  <span>Please enter at least 6 characters. Do not use passwords that are easy to guess.</span>
                </div>
              </div>
            )
          }
          placement="right"
          open={open}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="At least 6 characters, case sensitive" />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="Confirm password" />
        </FormItem>
        <FormItem
          name="mobile"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            {
              pattern: /^\d{11}$/,
              message: 'The input is not valid phone number!',
            },
          ]}
        >
          <Space>
            <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '30%' }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
            <Input size="large" placeholder="Phone number" />
          </Space>
        </FormItem>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha code!',
                },
              ]}
            >
              <Input size="large" placeholder="Captcha" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : 'Get Captcha'}
            </Button>
          </Col>
        </Row>
        <FormItem>
          <div>
            <Button
              size="large"
              loading={submitting}
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
            <Link to="/user/login">
              <span>Already have an account? Log in now!</span>
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
