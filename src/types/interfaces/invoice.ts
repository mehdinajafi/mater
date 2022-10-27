export default interface IInvoice {
  id: string;
  category: string;
  price: number;
  status: InvoiceStatus;
}

export enum InvoiceStatus {
  "Paid",
  "In Progress",
  "Out Of Date",
}
