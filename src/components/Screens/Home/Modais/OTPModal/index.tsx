import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
  Button,
  Checkbox,
  Image,
  ModalBackdrop,
  Pressable,
} from '@/components/ui';

type OTPModalProps = {
  visible: boolean;
  onClose?: () => void;
  onConfirm: (code: string, dontAskAgain: boolean) => void;
};

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export const OTPModal = ({ visible, onClose, onConfirm }: OTPModalProps) => {
  const [code, setCode] = useState('');
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleConfirm = () => {
    if (code.length === 6) {
      onConfirm(code, dontAskAgain);
    }
  };

  const renderDigits = () => {
    const digits = [];
    for (let i = 0; i < 6; i++) {
      const isFilled = code.length > i;
      const isActive = code.length === i;

      digits.push(
        <View
          key={i}
          className={`h-16 w-[15%] items-center justify-center rounded-2xl border-2 ${isFilled || isActive ? 'border-primary-100' : 'border-transparent'
            } ${isFilled || isActive ? 'bg-primary-100/10' : 'bg-neutral-20'}`}
        >
          <Text
            className={`font-poppins_bold text-2xl ${isFilled ? 'text-primary-100' : 'text-neutral-40'
              }`}
          >
            {code[i] || '0'}
          </Text>
        </View>,
      );
    }
    return digits;
  };

  return (
    <ModalBackdrop showIcon={false} visible={visible} onClose={onClose}>
      <View className="w-full items-center rounded-xl bg-white p-5 pt-3">
        <Image
          className="mb-2 h-48 w-full"
          contentFit="contain"
          source={require('@/assets/images/2FARequest.png')}
        />

        <Text className="mb-2 text-center font-poppins_bold text-lg text-primary-100">
          Digite seu código
        </Text>

        <Text className="mb-8 px-2 text-center font-poppins_regular text-sm leading-6 text-[#616161]">
          Insira o código que enviamos para o seu e-mail para continuar
        </Text>

        <Pressable
          className="mb-10 w-full flex-row justify-between"
          onPress={() => inputRef.current?.focus()}
        >
          {renderDigits()}
        </Pressable>

        <TextInput
          ref={inputRef}
          autoFocus={visible}
          keyboardType="number-pad"
          style={styles.hiddenInput}
          value={code}
          onChangeText={v => setCode(v.replace(/[^0-9]/g, '').slice(0, 6))}
        />

        <View className="mb-10 w-full">
          <Checkbox checked={dontAskAgain} onToggle={setDontAskAgain}>
            <Text className="font-poppins_medium text-xs text-neutral-100">
              Não solicitar esse código novamente por 30 dias
            </Text>
          </Checkbox>
        </View>

        <Button
          className="rounded-2xl"
          disabled={code.length < 6}
          text="Confirmar"
          textClassName="text-lg font-poppins_bold"
          onPress={handleConfirm}
        />
      </View>
    </ModalBackdrop>
  );
};
