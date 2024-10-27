import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
switch (variant) {
        case "danger":
    return "bg-red-500";
        case "success":
    return "bg-green-500";
        case "outline":
    return "bg-transparent border-neutral-300 border-[0.5px]";
        default:
    return "bg-[#2a364e]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
    return "text-primary-100";
        case "danger":
    return "text-red-100";
        case "success":
    return "text-green-100";
        default:
    return "text-white";
    }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full  p-3 flex flex-row justify-end items-end  ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold text-primary-100`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;