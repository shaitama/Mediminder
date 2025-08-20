import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function AddMedication() {
  const [medicationName, setMedicationName] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [dosageUnit, setDosageUnit] = useState<string>("mg");
  const [frequency, setFrequency] = useState<string>("");
  const [customFrequency, setCustomFrequency] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");

  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showReminderTime, setShowReminderTime] = useState<boolean>(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState<boolean>(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState<boolean>(false);

  const dosageUnits: string[] = ["mg", "ml", "g", "tablet", "capsule"];
  const frequencyOptions: string[] = [
    "Once a day",
    "Twice a day",
    "Thrice a day",
    "Every 6 hours",
    "Every 8 hours",
    "Custom"
  ];

  const handleDosageChange = (text: string): void => {
    const numericText = text.replace(/[^0-9]/g, '');
    setDosage(numericText);
  };

  const isFormValid: boolean = 
    medicationName.trim() !== "" && 
    dosage.trim() !== "" && 
    (frequency !== "Custom" ? frequency !== "" : customFrequency.trim() !== "") && 
    startDate !== null && 
    endDate !== null && 
    reminderTime !== null;

  const handleSubmit = (): void => {
    const finalFrequency: string = frequency === "Custom" ? customFrequency : frequency;
    
    const medicationData = {
      medicationName,
      dosage: `${dosage} ${dosageUnit}`,
      frequency: finalFrequency,
      startDate,
      endDate,
      reminderTime,
      notes,
    };

    console.log("Medication Added:", medicationData);
    alert("Medication successfully added!");
    
    setMedicationName("");
    setDosage("");
    setDosageUnit("mg");
    setFrequency("");
    setCustomFrequency("");
    setStartDate(new Date());
    setEndDate(new Date());
    setReminderTime(new Date());
    setNotes("");
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Add Medication</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Medication Name</Text>
          <View style={styles.textInput}>
            <RNTextInput
              value={medicationName}
              onChangeText={setMedicationName}
              style={styles.inputField}
              placeholder="Enter medication name"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Dosage</Text>
            <View style={styles.textInput}>
              <RNTextInput
                value={dosage}
                onChangeText={handleDosageChange}
                keyboardType="numeric"
                style={styles.inputField}
                placeholder="e.g. 500"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Unit</Text>
            <TouchableOpacity 
              style={styles.dropdownButton}
              onPress={() => setShowUnitDropdown(true)}
            >
              <Text style={styles.dropdownText}>{dosageUnit}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            <Modal
              transparent
              visible={showUnitDropdown}
              animationType="fade"
              onRequestClose={() => setShowUnitDropdown(false)}
            >
              <TouchableWithoutFeedback onPress={() => setShowUnitDropdown(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.dropdownOptions}>
                    {dosageUnits.map((unit, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.optionItem}
                        onPress={() => {
                          setDosageUnit(unit);
                          setShowUnitDropdown(false);
                        }}
                      >
                        <Text style={styles.optionText}>{unit}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Frequency</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowFrequencyDropdown(true)}
          >
            <Text style={styles.dropdownText}>{frequency || "Select frequency"}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          <Modal
            transparent
            visible={showFrequencyDropdown}
            animationType="fade"
            onRequestClose={() => setShowFrequencyDropdown(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowFrequencyDropdown(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.dropdownOptions}>
                  {frequencyOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionItem}
                      onPress={() => {
                        setFrequency(option);
                        setShowFrequencyDropdown(false);
                      }}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {frequency === "Custom" && (
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <Text style={styles.inputLabel}>Custom Frequency</Text>
              <View style={styles.textInput}>
                <RNTextInput
                  value={customFrequency}
                  onChangeText={setCustomFrequency}
                  style={styles.inputField}
                  placeholder="e.g. Every 4 hours after meals"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Start Date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowStartDate(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          {showStartDate && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartDate(Platform.OS === "ios");
                if (selectedDate) {
                  setStartDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>End Date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowEndDate(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
          {showEndDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowEndDate(Platform.OS === "ios");
                if (selectedDate) {
                  setEndDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Reminder Time</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowReminderTime(true)}
          >
            <Text style={styles.dateButtonText}>{formatTime(reminderTime)}</Text>
          </TouchableOpacity>
          {showReminderTime && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                setShowReminderTime(Platform.OS === "ios");
                if (selectedTime) {
                  setReminderTime(selectedTime);
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notes (optional)</Text>
          <View style={[styles.textInput, { minHeight: 100 }]}>
            <RNTextInput
              value={notes}
              onChangeText={setNotes}
              style={[styles.inputField, { textAlignVertical: 'top' }]}
              multiline
              placeholder="Any additional notes about this medication"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isFormValid && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Text style={styles.submitButtonText}>Add Medication</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#fff",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputField: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#764ba2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownOptions: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "80%",
    maxHeight: 300,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#fff",
  },
});