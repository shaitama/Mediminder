import { View, Text, TouchableOpacity } from "react-native";

export default function Settings() {
  return (
    <View className="flex-1 bg-white px-6 py-10">
      <Text className="text-3xl font-bold text-blue-600 mb-6">Settings</Text>

      <TouchableOpacity className="bg-gray-100 py-4 px-6 rounded-xl mb-3">
        <Text className="text-gray-800 text-lg">Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-100 py-4 px-6 rounded-xl mb-3">
        <Text className="text-gray-800 text-lg">Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-gray-100 py-4 px-6 rounded-xl mb-3">
        <Text className="text-gray-800 text-lg">QR Code (Future)</Text>
      </TouchableOpacity>

      <Text className="mt-10 text-gray-600">App Version: 0.6.2</Text>
    </View>
  );
}
