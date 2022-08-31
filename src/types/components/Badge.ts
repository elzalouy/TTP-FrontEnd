export interface IFormBadge {
  name: string;
  index: number;
  onChange: () => void;
}

export interface ICardBadge {
   _id:string | number;
   fontColor:string;
   text:string;
}