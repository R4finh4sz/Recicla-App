import { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

import { colors } from '@/global/colors';

type Props = PropsWithChildren<{
  className?: string;
  style?: ViewStyle;
  bg?: string;
  borderColor?: string;
}>;

export const Surface = ({
  children,
  className,
  style,
  bg = colors.bronze.main,
  borderColor = '#E5E5E5',
}: Props) => {
  return (
    <View
      className={['rounded-2xl border', className].filter(Boolean).join(' ')}
      style={[{ backgroundColor: bg, borderColor }, style]}
    >
      {children}
    </View>
  );
};
