export type DialogOption = {
  label: string;
  image?: any | undefined;
  id: string;
};
export type SelectDialogProps = {
  options: DialogOption[];
  selected?: DialogOption;
  setSelectedValue: any;
  label: string;
  placeholder: string;
  name: string;
};
export interface DialogProps {
  open: boolean;
  selectedValue?: DialogOption;
  onClose: (value: DialogOption) => void;
  options: DialogOption[];
}
