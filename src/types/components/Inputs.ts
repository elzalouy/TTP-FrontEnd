export interface InputProps {
  name: string;
  control: any;
  register: any;
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
  error?:boolean;
}

export interface DateInputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  setValue: any;
  placeholder: string;
  label: string;
}

export interface PasswordInputProps {
  name: string;
  label: string
  control: any;
  register: any;
  visible: boolean;
  setVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
  minLength: boolean;
  error?:boolean;
  wrapper?:boolean;
}

export interface IFormInputs {
  email: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string
}