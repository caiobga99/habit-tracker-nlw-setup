import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-zinc-400 text-base active:text-violet-500">
      Você ainda não está monitorando nenhum hábito{" "}
      <Text
        className="text-violet-400 text-base underline"
        onPress={() => navigate("new")}
      >
        Começe cadastrando um!
      </Text>
    </Text>
  );
}
