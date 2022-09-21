export interface IFormBadge {
  name: string;
  onChange: () => void;
}

export interface ICardBadge {
  _id: string | number;
  fontColor: string;
  text: string;
}
