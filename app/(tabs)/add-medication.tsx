import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ColorValue, Modal, Platform, TextInput as RNTextInput, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";

export default function AddMedication() {
  const [medicationName, setMedicationName] = useState<string>("");
  const [dosage, setDosage] = useState<number | null>(null);
  const [dosageUnit, setDosageUnit] = useState<string>("mg");
  const [frequency, setFrequency] = useState<string>("");
  const [customInterval, setCustomInterval] = useState<string>("");
  const [customIntervalUnit, setCustomIntervalUnit] = useState<string>("hours");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reminderTime, setReminderTime] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");

  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [showReminderTime, setShowReminderTime] = useState<boolean>(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState<boolean>(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState<boolean>(false);
  const [showIntervalUnitDropdown, setShowIntervalUnitDropdown] = useState<boolean>(false);

  const dosageUnits: string[] = ["mg", "ml", "g", "tablet", "capsule"];
  const frequencyOptions: string[] = [
    "Once a day",
    "Twice a day",
    "Every 6 hours",
    "Every 8 hours",
    "Custom"
  ];
  const intervalUnits: string[] = ["hours", "days"];

  const colors: [ColorValue, ColorValue] = ["#667eea", "#764ba2"];

  const handleDosageChange = (text: string): void => {
    if (text === "") {
      setDosage(null);
    } else {
      const numericValue = parseFloat(text);
      if (!isNaN(numericValue)) {
        setDosage(numericValue);
      }
    }
  };

  const isFormValid: boolean = 
    medicationName.trim() !== "" && 
    dosage !== null && 
    (frequency !== "Custom" ? frequency !== "" : customInterval.trim() !== "") && 
    startDate !== null && 
    endDate !== null && 
    reminderTime !== null;

  const handleSubmit = (): void => {
    const finalFrequency: string = frequency === "Custom" 
      ? `Every ${customInterval} ${customIntervalUnit}` 
      : frequency;
    
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
    setDosage(null);
    setDosageUnit("mg");
    setFrequency("");
    setCustomInterval("");
    setCustomIntervalUnit("hours");
    setStartDate(new Date());
    setEndDate(new Date());
    setReminderTime(new Date());
    setNotes("");
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getReminderInterval = (): string => {
    switch(frequency) {
      case "Once a day":
        return "Every 24 hours";
      case "Twice a day":
        return "Every 12 hours";
      case "Every 6 hours":
        return "Every 6 hours";
      case "Every 8 hours":
        return "Every 8 hours";
      case "Custom":
        return customInterval ? `Every ${customInterval} ${customIntervalUnit}` : "Set custom interval";
      default:
        return "Select frequency first";
    }
  };

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.stickyHeader}>
        <Text style={styles.header}>Add Medication</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            <View style={[styles.textInput, styles.fixedHeight]}>
              <RNTextInput
                value={dosage === null ? "" : dosage.toString()}
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
              style={[styles.dropdownButton, styles.fixedHeight]}
              onPress={() => {
                setShowFrequencyDropdown(false);
                setShowIntervalUnitDropdown(false);
                setShowUnitDropdown(!showUnitDropdown);
              }}
            >
              <Text style={styles.dropdownText}>{dosageUnit}</Text>
              <Text style={styles.dropdownArrow}>
                {showUnitDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Frequency</Text>
          <TouchableOpacity 
            style={[styles.dropdownButton, styles.fixedHeight]}
            onPress={() => {
              setShowUnitDropdown(false);
              setShowIntervalUnitDropdown(false);
              setShowFrequencyDropdown(!showFrequencyDropdown);
            }}
          >
            <Text style={styles.dropdownText}>{frequency || "Select frequency"}</Text>
            <Text style={styles.dropdownArrow}>
              {showFrequencyDropdown ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {frequency === "Custom" && (
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <Text style={styles.inputLabel}>Custom Interval</Text>
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <View style={[styles.textInput, styles.fixedHeight]}>
                    <RNTextInput
                      value={customInterval}
                      onChangeText={setCustomInterval}
                      keyboardType="numeric"
                      style={styles.inputField}
                      placeholder="e.g. 4"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
                <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                  <TouchableOpacity 
                    style={[styles.dropdownButton, styles.fixedHeight]}
                    onPress={() => {
                      setShowUnitDropdown(false);
                      setShowFrequencyDropdown(false);
                      setShowIntervalUnitDropdown(!showIntervalUnitDropdown);
                    }}
                  >
                    <Text style={styles.dropdownText}>{customIntervalUnit}</Text>
                    <Text style={styles.dropdownArrow}>
                      {showIntervalUnitDropdown ? "▲" : "▼"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Reminder</Text>
          <View style={[styles.reminderBox, styles.fixedHeight]}>
            <Text style={styles.reminderText}>
              {frequency ? getReminderInterval() : "Select frequency first"}
            </Text>
          </View>
          <Text style={styles.reminderNote}>
            {frequency ? 
              "Reminders will be set based on the frequency you selected" : 
              "Reminder interval will be determined by the frequency"}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Start Date</Text>
          <TouchableOpacity 
            style={[styles.dateButton, styles.fixedHeight]}
            onPress={() => setShowStartDate(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          {showStartDate && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              themeVariant="light"
              textColor="#764ba2"
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
            style={[styles.dateButton, styles.fixedHeight]}
            onPress={() => setShowEndDate(true)}
          >
            <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
          {showEndDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              themeVariant="light"
              textColor="#764ba2"
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
          <Text style={styles.inputLabel}>First Reminder Time</Text>
          <TouchableOpacity 
            style={[styles.dateButton, styles.fixedHeight]}
            onPress={() => setShowReminderTime(true)}
          >
            <Text style={styles.dateButtonText}>{formatTime(reminderTime)}</Text>
          </TouchableOpacity>
          {showReminderTime && (
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              themeVariant="light"
              textColor="#764ba2"
              onChange={(event, selectedTime) => {
                setShowReminderTime(Platform.OS === "ios");
                if (selectedTime) {
                  setReminderTime(selectedTime);
                }
              }}
            />
          )}
          <Text style={styles.reminderNote}>
            This will be the time for your first reminder. Subsequent reminders will follow the frequency pattern.
          </Text>
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

      <Modal
        visible={showUnitDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUnitDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUnitDropdown(false)}
        >
          <View style={styles.modalContent}>
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
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showFrequencyDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFrequencyDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFrequencyDropdown(false)}
        >
          <View style={styles.modalContent}>
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
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showIntervalUnitDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowIntervalUnitDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowIntervalUnitDropdown(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.dropdownOptions}>
              {intervalUnits.map((unit, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => {
                    setCustomIntervalUnit(unit);
                    setShowIntervalUnitDropdown(false);
                  }}
                >
                  <Text style={styles.optionText}>{unit}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    backgroundColor: '#6677e1',
    zIndex: 100,
    height: 112,
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
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
    justifyContent: 'center',
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
    zIndex: 5,
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
  dropdownOptions: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
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
    paddingHorizontal: 15,
    justifyContent: 'center',
    zIndex: 1,
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
  },
  reminderBox: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: 'center',
    zIndex: 1,
  },
  reminderText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#333",
    fontWeight: '600',
  },
  reminderNote: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    zIndex: 1,
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
  fixedHeight: {
    height: 48,
  },
});