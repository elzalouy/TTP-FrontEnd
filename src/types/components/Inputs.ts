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
  error?: boolean;
  wrapper?: boolean;
  custom?: {
    value: string;
    onChangeEvent: (e: any) => void;
  };
}

export interface IButton {
  label: string;
  size: 'large' | 'medium' | 'small';
  type: 'main' | 'delete' | 'add' | 'cancel';
  onClick: (e:any) => any;
  loading: boolean | null;
  disabled?: boolean;
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

export interface IIPasswordInputProps {
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

export interface IIFormInputs {
  email: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string
}