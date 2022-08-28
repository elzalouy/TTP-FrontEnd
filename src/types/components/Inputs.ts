export interface IInputProps {
  name?: string;
  control?: any;
  register?: any;
  label: string;
  state?: any;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  id?: string;
  dataTestId?: string;
  required?: boolean
  bold?: boolean;
  type?: boolean;
  inputName?: string;
  error?: boolean;
  wrapper?: boolean;
  custom?: {
    value: string;
    onChangeEvent: (e: any) => void;
  };
}

export interface ISearch {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  size: 'medium' | 'small';
}

export interface IButton {
  label: string;
  size: 'large' | 'medium' | 'small';
  type: 'main' | 'delete' | 'add' | 'cancel';
  onClick?: (e: any) => any;
  loading?: boolean | null;
  disabled?: boolean;
  form?:{
    type:'button'|'submit' | 'reset';
    name:string;
  };
  dataTestId?: string
}

export interface IIDateInputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  setValue: any;
  placeholder: string;
  label: string;
}

export interface IPasswordInputProps {
  name: string;
  label: string
  control: any;
  register: any;
  visible: boolean;
  setVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
  minLength: boolean;
  error?: boolean;
  wrapper?: boolean;
}

export interface IFormInputs {
  email: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string
}
 
export interface IFilterProps {
  elementType: "filter" | "select";
  name: string;
  onSelect: any;
  selected: string;
  options: {
    id: string;
    value: string;
    text: string;
  }[];
  label?: string;
  textTruncate?: number;
  error?: string;
}