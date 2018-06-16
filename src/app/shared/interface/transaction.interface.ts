export interface ITransaction {
  _id: string;
  name: string;
  request: any;
  response: any;
  user: string;
  product: string;
  amount: number;
  TransactionDate: string;
}