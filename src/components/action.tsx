import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { ThemedText, ThemedTextProps } from "./theme/text";

interface ActionProps extends TouchableOpacityProps {
  children: ReactNode;
  action: () => void;
}

function Action({ children, className, action, ...rest }: ActionProps) {
  return (
    <TouchableOpacity
      className={
        "min-h-10 max-h-10 flex-row items-center gap-2 px-4" + className
      }
      onPress={action}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function Title({ children, className, ...rest }: ThemedTextProps) {
  return (
    <ThemedText
      fontWeight="semibold"
      className={"flex-1 mx-2 px-2" + className}
      {...rest}
    >
      {children}
    </ThemedText>
  );
}

Action.Title = Title;

export { Action };
