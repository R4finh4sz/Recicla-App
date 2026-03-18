import { Text } from 'react-native';

export const LoginIntro = () => {
  return (
    <>
      <Text className="mb-3 text-center font-roboto_bold text-[22px] text-primary-100">
        Seja bem-vindo!
      </Text>

      <Text className="text-center font-roboto_regular text-base text-neutral-80">
        Faça login ou cadastre-se para continuar
      </Text>
    </>
  );
};
