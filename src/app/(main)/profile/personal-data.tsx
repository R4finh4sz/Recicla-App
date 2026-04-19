import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import {
  AtSign,
  Calendar,
  ChevronRight,
  Mail,
  Pencil,
  Phone,
  Trash2,
  User,
} from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

import {
  Button,
  Container,
  Header,
  Input,
  Pressable,
  ProfilePhotoPicker,
} from '@/components/ui';
import ModalBackdrop from '@/components/ui/Modais/ModalBackdrop';
import { useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';
import {
  PersonalDataForm,
  PersonalDataSchema,
} from '@/validation/personal_data.validation';

const PersonalData = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<PersonalDataForm>({
    resolver: zodResolver(PersonalDataSchema),
    defaultValues: {
      fullName: user?.name || 'João Silva',
      username: 'joaosilva',
      email: 'joao.silva@email.com',
      phone: '+55 (11) 98765-4321',
      birthDate: '15/03/1995',
    },
  });

  const onSubmit = (data: PersonalDataForm) => {
    console.log('Saved:', data);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    if (isDirty) {
      setShowErrorModal(true);
    } else {
      router.back();
    }
  };

  return (
    <Container className="bg-[#F8F9FA]" withPadding={false}>
      <Header showBackButton title="Dados Pessoais" onBackPress={handleBack} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8">
          <View className="relative">
            <ProfilePhotoPicker imageUrl="https://i.pravatar.cc/300" />

            <View className="absolute bottom-6 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-100">
              <Pencil color="white" size={16} />
            </View>
          </View>

          <Text className="mt-2 font-poppins_medium text-primary-100">
            Alterar foto de perfil
          </Text>
        </View>

        <View className="gap-5 px-4">
          <Input
            control={control}
            icon={{
              name: 'WhitePencilIcon' as any,
              color: colors.primary[100],
              size: 18,
            }}
            label="Nome Completo"
            leftIcon={{ LucideIcon: User, color: colors.neutral[60], size: 20 }}
            name="fullName"
            placeholder="João Silva"
          />

          <Input
            control={control}
            icon={{
              name: 'WhitePencilIcon' as any,
              color: colors.primary[100],
              size: 18,
            }}
            label="Nome de Usuário"
            leftIcon={{
              LucideIcon: AtSign,
              color: colors.neutral[60],
              size: 20,
            }}
            name="username"
            placeholder="joaosilva"
          />

          <Input
            control={control}
            icon={{
              name: 'WhitePencilIcon' as any,
              color: colors.primary[100],
              size: 18,
            }}
            keyboardType="email-address"
            label="E-mail"
            leftIcon={{ LucideIcon: Mail, color: colors.neutral[60], size: 20 }}
            name="email"
            placeholder="joao.silva@email.com"
          />

          <Input
            control={control}
            icon={{
              name: 'WhitePencilIcon' as any,
              color: colors.primary[100],
              size: 18,
            }}
            label="Telefone"
            leftIcon={{
              LucideIcon: Phone,
              color: colors.neutral[60],
              size: 20,
            }}
            name="phone"
            placeholder="+55 (11) 98765-4321"
            type="cel-phone"
          />

          <Input
            containerProps={{ style: { opacity: 0.8 } }}
            control={control}
            editable={false}
            label="Data de Nascimento"
            leftIcon={{
              LucideIcon: Calendar,
              color: colors.neutral[60],
              size: 20,
            }}
            name="birthDate"
            options={{ format: 'DD/MM/YYYY' }}
            placeholder="15/03/1995"
            type="datetime"
          />

          <View className="mt-4 rounded-2xl border border-red-50 bg-white p-4 shadow-sm">
            <Text className="font-poppins_bold text-red-500">
              Zona de Perigo
            </Text>

            <Pressable className="mt-3 flex-row items-center justify-between rounded-xl bg-red-50 p-4">
              <View className="flex-row items-center gap-3">
                <Trash2 color={colors.alert.error.primary} size={20} />

                <Text className="font-poppins_medium text-red-500">
                  Excluir Conta
                </Text>
              </View>

              <ChevronRight color={colors.alert.error.primary} size={20} />
            </Pressable>
          </View>
        </View>

        <View className="mb-10 mt-8 p-4">
          <Button text="Salvar" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>

      {showSuccessModal && (
        <ModalBackdrop
          showButton
          visible
          buttonText="Entendi"
          message="Seus dados foram atualizados com sucesso."
          title="Sucesso!"
          variant="success"
          onClose={() => {
            setShowSuccessModal(false);
            router.back();
          }}
        />
      )}

      {showErrorModal && (
        <ModalBackdrop
          visible
          buttons={[
            {
              text: 'Sair sem salvar',
              onPress: () => {
                setShowErrorModal(false);
                router.back();
              },
              wired: true,
              color: colors.alert.error.primary,
              textColor: colors.alert.error.primary,
            },
            {
              text: 'Continuar editando',
              onPress: () => setShowErrorModal(false),
            },
          ]}
          message="Você fez alterações que não foram salvas. Tem certeza que deseja sair?"
          title="Alterações não salvas!"
          variant="error"
        />
      )}
    </Container>
  );
};

export default PersonalData;
