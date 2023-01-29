import { StatusBar, Button } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import Loading from "./src/components/Loading";
import * as Notifications from "expo-notifications";

import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const sheduleNotifications = async () => {
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Olá, Caio!",
        body: "Você praticou seus hábiitos hoje?",
      },
      trigger,
    });
  };

  const getScheduleNotifications = async () => {
    const schedules = await Notifications.getAllScheduledNotificationsAsync();
    console.log(schedules);
  };

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
    
      {/* Test
      <Button title="Enviar" onPress={sheduleNotifications} />
      <Button title="Agendadas" onPress={getScheduleNotifications} /> 
      */}
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </>
  );
}
