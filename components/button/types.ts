import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

export interface DefaultButtonProps
  extends ComponentProps<typeof TouchableOpacity> {
  backgroundColor?: string;
  label: string;
}
