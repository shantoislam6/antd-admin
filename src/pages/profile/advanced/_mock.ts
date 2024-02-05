import type { Request, Response } from 'express';

const advancedOperation1 = [
  {
    key: 'op1',
    type: 'Order relationship effective',
    name: 'Qu Lili',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'Financial review',
    name: 'Fu Xiaoxiao',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Reasons for rejection',
  },
  {
    key: 'op3',
    type: 'Department initial review',
    name: 'Zhou Maomao',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'Submit order',
    name: 'Lin Dongdong',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Great',
  },
  {
    key: 'op5',
    type: 'Create order',
    name: 'Han Yaya',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: 'Order relationship effective',
    name: 'Qu Lili',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: 'Create order',
    name: 'Han Yaya',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

function getProfileAdvancedData(req: Request, res: Response) {
  const result = {
    data: {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    },
  };
  return res.json(result);
}

export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
