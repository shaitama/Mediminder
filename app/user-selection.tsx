import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function UserSelection() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#43e97b", "#38f9d7"]} style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>
        Select how you want to use MediMinder.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>👵 Elderly</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#fff" }]}
        onPress={() => router.push("/home")}
      >
        <Text style={[styles.buttonText, { color: "#43e97b" }]}>👩‍⚕️ Caregiver</Text>
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
    fontSize: 26,
    fontFamily: "SpaceMono",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 4,
    marginBottom: 16,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SpaceMono",
    color: "#007AFF",
    fontWeight: "bold",
  },
});
