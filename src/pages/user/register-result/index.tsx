import { Link, useSearchParams } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';
import useStyles from './style.style';

const RegisterResult: React.FC<Record<string, unknown>> = () => {
  const { styles } = useStyles();
  const [params] = useSearchParams();

  const actions = (
    <div className={styles.actions}>
      <a href="">
        <Button size="large" type="primary">
          <span>View Email</span>
        </Button>
      </a>
      <Link to="/">
        <Button size="large">Back to Homepage</Button>
      </Link>
    </div>
  );

  const email = params?.get('account') || 'AntDesign@example.com';
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>Your Account: {email} Registered Successfully</span>
        </div>
      }
      subTitle="An activation email has been sent to your email. The email is valid for 24 hours. Please log in to your email in a timely manner and click the link in the email to activate your account."
      extra={actions}
    />
  );
};
export default RegisterResult;
