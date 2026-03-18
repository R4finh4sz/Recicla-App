
import { BackIcon } from "@/assets/icons";
import { Text } from "react-native";
import Pressable from "../Pressable";
import { useRouter } from "expo-router";


type BackButtonProps = {
  Title: string;
  Onpress?: () => void;
}

export const BackButton = ({ Title, Onpress }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Pressable className="flex-row items-center gap-1 self-start" onPress={Onpress ?? (() => router.back())}>
      <BackIcon />
      <Text className="text-base font-montserrat_medium text-primary-100">{Title}</Text>
    </Pressable>
  );
};
