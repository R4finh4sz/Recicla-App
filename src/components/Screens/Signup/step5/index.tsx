import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignupPayload } from '@/app/(auth)/Signup';
import { Button, Image, KeyboardAwareScrollView } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import Checkbox from '@/components/ui/Checkbox';
import { CustomScrollIndicator } from '@/components/ui/CustomScrollIndicator';
import { TermsForm, TermsSchema } from '@/validation/signup.validation';

type Step5Props = {
  initialData: Partial<SignupPayload>;
  onNext: (data: TermsForm) => void;
  onBack: () => void;
};

export const SignupStep5 = ({ initialData, onNext, onBack }: Step5Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TermsForm>({
    mode: 'onChange',
    resolver: zodResolver(TermsSchema),
    defaultValues: {
      agreesToTerms: initialData.agreesToTerms || false,
    },
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState({ container: 0, content: 0 });
  const canScroll = dimensions.content > dimensions.container;
  const scrollRange = Math.max(0, dimensions.content - dimensions.container);

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
    >
      <View className="px-4 pt-4">
        <BackButton Onpress={onBack} Title="Voltar" />
      </View>

      <View className="flex-1 items-center px-4">
        <Image
          contentFit="contain"
          source={require('@/assets/images/Etapa4.png')}
          style={{ width: '70%', height: 150 }}
        />

        <Text className="mt-[-20px] text-center font-montserrat_bold text-[22px] text-primary-100">
          Cadastro
        </Text>

        <Text className="mb-6 mt-2 text-center font-montserrat_regular text-sm text-neutral-80">
          Para concluir seu cadastro, é necessário concordar com nossos Termos
          de Uso e Política de Privacidade.
        </Text>

        <View className="mb-6 h-80 w-full flex-row overflow-hidden rounded-xl border border-neutral-40 p-4 pr-1">
          <Animated.ScrollView
            nestedScrollEnabled
            className="flex-1 pr-3"
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(_, height) =>
              setDimensions(prev => ({ ...prev, content: height }))
            }
            onLayout={e => {
              const { height } = e.nativeEvent.layout;
              setDimensions(prev => ({
                ...prev,
                container: height,
              }));
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
          >
            <Text className="pb-4 font-montserrat_regular text-sm text-neutral-80">
              Lorem ipsum dolor sit amet consectetur. Iaculis in lobortis
              venenatis pretium adipiscing sit. Potenti nulla dictumst pretium
              semper vitae aliquet lacinia praesent. Donec eget auctor sodales
              nec. Sem ornare adipiscing odio integer eu. Arcu vel quis risus ut
              in. Integer rutrum adipiscing habitasse elementum tempor volutpat.
              Convallis enim felis nascetur viverra dictum potenti et gravida.
              Neque pretium sem amet eget. Enim proin semper morbi tristique
              consequat ac mi ullamcorper. Quisque ultrices turpis vitae risus
              arcu. Elementum luctus quam a purus lacinia. Volutpat faucibus
              nunc massa elit.
              {'\n\n'}
              Potenti nulla dictumst pretium semper vitae aliquet lacinia
              praesent. Donec eget auctor sodales nec. Sem ornare adipiscing
              odio integer eu. Arcu vel quis risus ut in.
            </Text>
          </Animated.ScrollView>

          <View className="h-full py-2">
            <CustomScrollIndicator
              canScroll={canScroll}
              dimensions={dimensions}
              scrollRange={scrollRange}
              scrollY={scrollY}
            />
          </View>
        </View>

        <View className="mb-6 w-full pl-1">
          <Controller
            control={control}
            name="agreesToTerms"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value}
                linkText="Termos de Uso e Política de Privacidade"
                onLinkPress={() => { }}
                onToggle={onChange}
              />
            )}
          />
        </View>

        <View className="mt-4 w-full items-center">
          <Button
            disabled={!isValid}
            text="Continuar"
            textClassName="text-base font-roboto_bold p-1"
            width="100%"
            onPress={handleSubmit(data => onNext(data))}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
