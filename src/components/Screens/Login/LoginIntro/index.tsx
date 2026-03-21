import { Text } from 'react-native';

export const LoginIntro = () => {
  return (
    <>
      <Text className="text-center font-montserrat_bold text-[22px] text-primary-100">
        Seja bem-vindo!
      </Text>

      <Text className="text-center font-montserrat_regular text-sm text-neutral-80">
        Faça login ou cadastre-se para continuar
      </Text>
    </>
  );
};
