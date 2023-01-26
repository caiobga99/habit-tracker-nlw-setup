import { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import Loading from "../components/Loading";
import { api } from "../lib/axios";

interface Params {
  date: string;
}
interface dayInfoProps {
  completed: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}
export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<dayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const route = useRoute();
  const { date } = route.params as Params;
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const fetchHabits = async () => {
    try {
      setLoading(true);

      const response = await api.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Ops",
        "Não foi possivel carregar as informações dos hábitos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="text-zinc-400 mt-6 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={30} />

        <View className="mt-6">
          {dayInfo?.possibleHabits &&
            dayInfo?.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
