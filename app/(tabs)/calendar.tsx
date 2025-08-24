import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarPage() {
  const [selected, setSelected] = useState("");

  return (
    <LinearGradient
      colors={["#e0f2fe", "#bae6fd", "#7dd3fc"]}
      style={styles.container}
    >
      <Text style={styles.header}>Medication Calendar</Text>

      <Calendar
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: "#0284c7",
          },
          "2025-08-24": {
            marked: true,
            dotColor: "red",
            activeOpacity: 0,
          },
          "2025-08-25": {
            marked: true,
            dotColor: "green",
            activeOpacity: 0,
          },
        }}
        theme={{
          selectedDayBackgroundColor: "#0284c7",
          todayTextColor: "#dc2626",
          arrowColor: "#0369a1",
          monthTextColor: "#075985",
          textMonthFontFamily: "SpaceMono",
          textDayFontFamily: "SpaceMono",
          textDayHeaderFontFamily: "SpaceMono",
        }}
        style={styles.calendar}
      />

      {selected ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Medications for <Text style={{ fontWeight: "bold" }}>{selected}</Text>:
          </Text>
          <Text style={styles.medText}>💊 Metformin – 8:00 AM</Text>
          <Text style={styles.medText}>💊 Amlodipine – 12:00 PM</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>Tap on a date to see medications.</Text>
      )}
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
    color: "#075985",
    marginBottom: 20,
    textAlign: "center",
  },
  calendar: {
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#fff",
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#0c4a6e",
    marginBottom: 8,
  },
  medText: {
    fontSize: 15,
    fontFamily: "SpaceMono",
    color: "#374151",
    marginLeft: 6,
    marginTop: 2,
  },
});