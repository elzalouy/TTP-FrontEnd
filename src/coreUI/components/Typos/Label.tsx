import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
interface LabelProps {
  hasIcon?: boolean;
  onClose?: any;
  px: string;
  py: string;
  mx: string;
  my: string;
  bgColor: string;
  value: string;
}

/**
 * Label
 *
 * It's a colored label with ability to add more options
 * - close icon
 * - fontColor
 * - fontSize
 * - paddingX
 * - paddingY
 * - marginX
 * - marginY
 * - bgColor
 * @returns JSX.Element
 */
const Label = (props: LabelProps) => {
  return <Typography>{props.value}</Typography>;
};

export default Label;
