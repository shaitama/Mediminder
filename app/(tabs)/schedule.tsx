import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const upcomingMeds = [
  {
    id: "1",
    date: "August 25, 2025",
    time: "8:00 AM",
    name: "Metformin",
    dosage: "500mg",
    image: require("../../assets/images/icon.jpg"), // ✅ Added image
  },
  {
    id: "2",
    date: "August 25, 2025",
    time: "12:00 PM",
    name: "Amlodipine",
    dosage: "10mg",
    image: require("../../assets/images/icon.jpg"), // ✅ Added image
  },
  {
    id: "3",
    date: "August 26, 2025",
    time: "7:30 AM",
    name: "Lisinopril",
    dosage: "20mg",
    image: require("../../assets/images/icon.jpg"), // ✅ Added image
  },
  {
    id: "4",
    date: "August 26, 2025",
    time: "9:00 PM",
    name: "Atorvastatin",
    dosage: "20mg",
    image: require("../../assets/images/icon.jpg"), // ✅ Added image
  },
];

export default function Schedule() {
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
    <LinearGradient colors={["#38bdf8", "#2563eb"]} style={styles.container}>
      <Text style={styles.header}>Upcoming Schedule</Text>

      <FlatList
        data={upcomingMeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
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

            {/* ✅ Image + Medicine Info */}
            <View style={styles.medicineInfo}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.dosage}>{item.dosage}</Text>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
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
  date: {
    fontSize: 14,
    fontFamily: "SpaceMono",
    color: "#2563eb",
  },
  time: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#2563eb",
    fontWeight: "bold",
  },
  medicineInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#333",
  },
  dosage: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#666",
    marginTop: 2,
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
    backgroundColor: "#2563eb",
  },
  taken: {
    backgroundColor: "#28a745",
  },
  missed: {
    backgroundColor: "#dc3545",
  },
});
