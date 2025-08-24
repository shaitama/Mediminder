import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function UserSelection() {
  const router = useRouter();

  const handleRoleSelection = async (role: "self" | "caregiver") => {
    try {
      await AsyncStorage.setItem('userRole', role);
      router.push("/home");
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <LinearGradient colors={["#43e97b", "#38f9d7"]} style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>
        Select how you want to use MediMinder.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection("self")}
      >
        <Text style={styles.buttonText}> For Me </Text>
        <Text style={styles.buttonDescription}>Manage your own medications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#fff" }]}
        onPress={() => handleRoleSelection("caregiver")}
      >
        <Text style={[styles.buttonText, { color: "#43e97b" }]}> Someone I Care For </Text>
        <Text style={[styles.buttonDescription, { color: "#666" }]}>Manage medications for someone else</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: "SpaceMono",
    color: "#1a5c3a",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "SpaceMono",
    color: "#15715a",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "600",
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 4,
    marginBottom: 20,
    width: "85%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SpaceMono",
    color: "#007AFF",
    fontWeight: "bold",
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    color: "#666",
    textAlign: "center",
  },
});