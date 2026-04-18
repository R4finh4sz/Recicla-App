import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ContainerProps = {
  children: React.ReactNode;
  withPadding?: boolean;
  useSafeArea?: boolean;
} & ViewProps;

export const Container = ({
  children,
  withPadding = true,
  useSafeArea = true,
  className,
  ...props
}: ContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-neutral-white ${withPadding ? 'px-4' : ''} ${className}`}
      style={{
        paddingTop: useSafeArea ? insets.top : 0,
      }}
      {...props}
    >
      {children}
    </View>
  );
};
