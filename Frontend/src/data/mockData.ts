// src/data/mockData.ts

import { Money } from '../types/types';

export const mockTransactions: Money[] = [
  {
    ID: 1,
    ValueofMoney: 600,
    MoneyCategory: 'じぶんのためにつかいます',
    TransferDate: '2024-06-01',
    Comment: 'おこづかい',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 2,
    ValueofMoney: 200,
    MoneyCategory: 'ちょきんしました',
    TransferDate: '2024-06-01',
    Comment: '',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 3,
    ValueofMoney: 200,
    MoneyCategory: 'だれかのためにつかいます',
    TransferDate: '2024-06-01',
    Comment: '',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 4,
    ValueofMoney: -100,
    MoneyCategory: 'じぶんのためにつかいました',
    TransferDate: '2024-06-05',
    Comment: 'おかし',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 5,
    ValueofMoney: -200,
    MoneyCategory: 'だれかのためにつかいました',
    TransferDate: '2024-06-12',
    Comment: '父の日にビール',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 6,
    ValueofMoney: -150,
    MoneyCategory: 'じぶんのためにつかいました',
    TransferDate: '2024-06-12',
    Comment: 'らくがきちょう',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 7,
    ValueofMoney: 100,
    MoneyCategory: 'じぶんのためにつかいます',
    TransferDate: '2024-07-13',
    Comment: '掃除のおてつだい',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 8,
    ValueofMoney: 100,
    MoneyCategory: 'ちょきんしました',
    TransferDate: '2024-06-10',
    Comment: 'せんたくおてつだい',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
  {
    ID: 9,
    ValueofMoney: -100,
    MoneyCategory: 'ちょきんをつかいました',
    TransferDate: '2024-06-13',
    Comment: 'カード',
    Users: {
      ID: 1,
      Name: 'ユーザー1',
      Email: 'user1@example.com',
      ChildName: '子供1'
    }
  },
];
