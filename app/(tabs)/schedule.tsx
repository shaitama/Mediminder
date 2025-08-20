import { View, Text } from "react-native";

export default function Schedule() {
  return (
    <View className="flex-1 bg-gray-50 px-6 py-10">
      <Text className="text-3xl font-bold text-blue-600 mb-4">Schedule</Text>
      <Text className="text-gray-700">Your upcoming medication reminders will appear here.</Text>
    </View>
  );
}
