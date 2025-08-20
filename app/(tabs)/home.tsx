import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const meds = [
  { id: "1", time: "8:00 AM", name: "Metformin", dosage: "500mg" },
  { id: "2", time: "12:00 PM", name: "Amlodipine", dosage: "10mg" },
  { id: "3", time: "8:00 PM", name: "Atorvastatin", dosage: "20mg" },
];

export default function Home() {
  const [status, setStatus] = useState<{ [key: string]: string }>({});

  const handlePress = (id: string) => {
    setStatus((prev) => {
      const current = prev[id];
      if (current === "Taken") return { ...prev, [id]: "Missed" };
      if (current === "Missed") return { ...prev, [id]: "Take Now" };
      return { ...prev, [id]: "Taken" };
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Text style={styles.header}>Today’s Medications</Text>

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.time}>{item.time}</Text>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  status[item.id] === "Taken"
                    ? styles.taken
                    : status[item.id] === "Missed"
                    ? styles.missed
                    : styles.takeNow,
                ]}
                onPress={() => handlePress(item.id)}
              >
                <Text style={styles.statusText}>
                  {status[item.id] || "Take Now"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.dosage}>{item.dosage}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#764ba2",
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  dosage: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#666",
    marginTop: 4,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: "SpaceMono",
    fontWeight: "600",
    color: "#fff",
  },
  takeNow: {
    backgroundColor: "#667eea",
  },
  taken: {
    backgroundColor: "#28a745",
  },
  missed: {
    backgroundColor: "#dc3545",
  },
});