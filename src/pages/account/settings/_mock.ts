import type { Request, Response } from 'express';

const city = require('./geographic/city.json');
const province = require('./geographic/province.json');

function getProvince(_: Request, res: Response) {
  return res.json({
    data: province,
  });
}

function getCity(req: Request, res: Response) {
  return res.json({
    data: city[req.params.province],
  });
}

function getCurrentUse(req: Request, res: Response) {
  return res.json({
    data: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: 'Inclusive, openness, tolerance',
      title: 'Interaction Expert',
      group: 'Ant Financial - Some Department - Some Platform Department - Some Technical Department - UED',
      tags: [
        {
          key: '0',
          label: 'Innovative',
        },
        {
          key: '1',
          label: 'Design-focused',
        },
        {
          key: '2',
          label: 'Spicy',
        },
        {
          key: '3',
          label: 'Long legs',
        },
        {
          key: '4',
          label: 'Sichuan girl',
        },
        {
          key: '5',
          label: 'Inclusive',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: 'Zhejiang Province',
          key: '330000',
        },
        city: {
          label: 'Hangzhou City',
          key: '330100',
        },
      },
      address: '77 Gongzhuan Road, Xihu District',
      phone: '0752-268888888',
    },
  });
}
// The code is compatible with local service mock and static data of deployed sites
export default {
  // Supports values of Object and Array
  'GET /api/accountSettingCurrentUser': getCurrentUse,
  'GET /api/geographic/province': getProvince,
  'GET /api/geographic/city/:province': getCity,
};
