import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Sample Data
const meds = [
  { 
    id: "1", 
    time: "8:00 AM", 
    name: "Metformin", 
    dosage: "500mg",
    image: require("../../assets/images/icon.jpg"),
  },
  { 
    id: "2", 
    time: "12:00 PM", 
    name: "Amlodipine", 
    dosage: "10mg",
    image: require("../../assets/images/icon.jpg"),
  },
  { 
    id: "3", 
    time: "8:00 PM", 
    name: "Atorvastatin", 
    dosage: "20mg",
    image: null,
  },
];

export default function Home() {
  const [status, setStatus] = useState<{ [key: string]: string }>({});

  // Handle cycling between statuses
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
      <Text style={styles.header}>Today's Medications</Text>

      <FlatList
        data={meds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const currentStatus = status[item.id] || "Take Now";
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.time}>{item.time}</Text>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    currentStatus === "Taken"
                      ? styles.taken
                      : currentStatus === "Missed"
                      ? styles.missed
                      : styles.takeNow,
                  ]}
                  onPress={() => handlePress(item.id)}
                >
                  <Text style={styles.statusText}>{currentStatus}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.medicationInfo}>
                {/* Display medication image if available */}
                {item.image ? (
                  <Image source={item.image} style={styles.medicationImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>💊</Text>
                  </View>
                )}

                <View style={styles.medicationDetails}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.dosage}>{item.dosage}</Text>
                </View>
              </View>
            </View>
          );
        }}
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
    marginBottom: 15,
  },
  time: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#764ba2",
    fontWeight: "bold",
  },
  medicationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
  },
  medicationDetails: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
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
