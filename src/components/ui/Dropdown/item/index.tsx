import { PressableProps, Text } from 'react-native';

import Pressable from '../../Pressable';

export type TOption = {
  label: string;
  value: string;
  subtitle?: string;
  address?: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type Props = {
  option: TOption;
  isSelected?: boolean;
} & PressableProps;

export const DropdownItem = ({
  option,
  isSelected = false,
  ...props
}: Props) => {
  const formatAddress = () => {
    if (!option.address) {
      return null;
    }

    const { street, number, neighborhood, city, state } = option.address;
    return `${street}, ${number} - ${neighborhood}, ${city} - ${state}`;
  };

  return (
    <Pressable className="w-full py-2.5" {...props}>
      <Text
        className={`font-light text-sm ${isSelected ? 'text-tertiary-100' : 'text-neutral-80'}`}
        numberOfLines={2}
      >
        {option.label}
      </Text>

      {option.address && (
        <Text
          className="mt-1 font-light text-xs text-neutral-60"
          numberOfLines={1}
        >
          {formatAddress()}
        </Text>
      )}
    </Pressable>
  );
};
