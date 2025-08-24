import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View, } from "react-native";

const medications = [
  { 
    id: "1", 
    name: "Metformin", 
    dosage: "500mg", 
    expiryDate: new Date(2025, 11, 15), // Dec 15, 2025
    status: "Safe"
  },
  { 
    id: "2", 
    name: "Lisinopril", 
    dosage: "10mg", 
    expiryDate: new Date(2025, 8, 14), // Sep 14, 2025
    status: "Expiring in a Few Days"
  },
  { 
    id: "3", 
    name: "Aspirin", 
    dosage: "81mg", 
    expiryDate: new Date(2024, 11, 20), // Dec 20, 2024
    status: "Expired"
  },
  { 
    id: "4", 
    name: "Vitamin D3", 
    dosage: "1000IU", 
    expiryDate: new Date(2025, 7, 29), // Aug 29, 2025
    status: "Safe"
  },
  { 
    id: "5", 
    name: "Atorvastatin", 
    dosage: "20mg", 
    expiryDate: new Date(2025, 6, 15), // Jul 15, 2025
    status: "Expiring in a Few Days"
  },
];

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getStatusInfo = (expiryDate: Date): {status: string, daysLeft: number} => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return {status: "Expired", daysLeft: 0};
  if (diffDays <= 7) return {status: `Expiring in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, daysLeft: diffDays};
  return {status: "Safe", daysLeft: diffDays};
};

export default function ExpiryMonitor() {
  const [filter, setFilter] = useState<string>("All");
  const [expiryAlerts, setExpiryAlerts] = useState<boolean>(true);

  const updatedMeds = medications.map(med => ({
    ...med,
    ...getStatusInfo(med.expiryDate)
  }));

  const filteredMeds = updatedMeds.filter(med => {
    if (filter === "All") return true;
    if (filter === "Expiring Soon") return med.status.startsWith("Expiring in");
    if (filter === "Expired") return med.status === "Expired";
    return true;
  });

  const getStatusStyle = (status: string) => {
    if (status === "Expired") return styles.expiredStatus;
    if (status.startsWith("Expiring in")) return styles.expiringStatus;
    return styles.safeStatus;
  };

  const getStatusEmoji = (status: string): string => {
    if (status === "Expired") return "💀";
    if (status.startsWith("Expiring in")) return "❗";
    return "✔";
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Text style={styles.header}>Medication Expiry Monitor</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === "All" && styles.activeFilter]}
          onPress={() => setFilter("All")}
        >
          <Text style={[styles.filterText, filter === "All" && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === "Expiring Soon" && styles.activeFilter]}
          onPress={() => setFilter("Expiring Soon")}
        >
          <Text style={[styles.filterText, filter === "Expiring Soon" && styles.activeFilterText]}>
            Expiring Soon
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === "Expired" && styles.activeFilter]}
          onPress={() => setFilter("Expired")}
        >
          <Text style={[styles.filterText, filter === "Expired" && styles.activeFilterText]}>
            Expired
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredMeds}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.medCard}>
            <View style={styles.medHeader}>
              <Text style={styles.medName}>{item.name}</Text>
              <View style={[styles.statusPill, getStatusStyle(item.status)]}>
                <Text style={styles.statusText}>
                  {item.status} {getStatusEmoji(item.status)}
                </Text>
              </View>
            </View>
            
            <Text style={styles.dosage}>{item.dosage}</Text>
            <Text style={styles.expiry}>
              {item.status === "Expired" ? "Expired: " : "Expires: "}
              {formatDate(item.expiryDate)}
            </Text>
          </View>
        )}
      />

      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>Enable Expiry Alerts</Text>
        <Switch
          value={expiryAlerts}
          onValueChange={setExpiryAlerts}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={expiryAlerts ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#fff",
  },
  filterText: {
    color: "#fff",
    fontFamily: "SpaceMono",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#764ba2",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  medCard: {
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
  medHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  medName: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#333",
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    fontWeight: "600",
    color: "#fff",
  },
  safeStatus: {
    backgroundColor: "#28a745",
  },
  expiringStatus: {
    backgroundColor: "#ffc107",
  },
  expiredStatus: {
    backgroundColor: "#dc3545",
  },
  dosage: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#666",
    marginBottom: 4,
  },
  expiry: {
    fontSize: 14,
    fontFamily: "SpaceMono",
    color: "#888",
  },
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  alertText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#764ba2",
  },
});