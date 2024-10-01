
export interface Money {
    ID: number;
    ValueofMoney: number;
    MoneyCategory: string;
    TransferDate: string;
    Comment: string;
    showDetails?: boolean; // showDetailsプロパティを追加
    Users: {
      ID: number;
      Name: string;
      Email: string;
      ChildName: string;
    };
  }
  