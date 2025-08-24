import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MonthDirection = 'prev' | 'next';
type MedicationStatus = 'taken' | 'some' | 'missed' | 'none';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 15));
  const [selectedDate, setSelectedDate] = useState("2025-07-15");
  const scrollViewRef = useRef<ScrollView>(null);
  
  const navigateMonth = (direction: MonthDirection) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);

    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getLastDayOfPrevMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 0).getDate();
  };

  const renderCalendar = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const lastDayPrevMonth = getLastDayOfPrevMonth(currentDate);
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    let calendarDays: Array<{day: number, isPreviousMonth?: boolean, isCurrentMonth?: boolean, isNextMonth?: boolean, dateStr: string}> = [];

    for (let i = 0; i < firstDay; i++) {
      const day = lastDayPrevMonth - (firstDay - i - 1);
      calendarDays.push({ 
        day, 
        isPreviousMonth: true,
        dateStr: `${year}-${month - 1}-${day}`
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ 
        day: i, 
        isCurrentMonth: true,
        dateStr: `${year}-${month}-${i}`
      });
    }

    const totalCells = 42;
    const remainingDays = totalCells - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({ 
        day: i, 
        isNextMonth: true,
        dateStr: `${year}-${month + 1}-${i}`
      });
    }
    
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.monthNavigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
          >
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthText}>{formatMonthYear(currentDate)}</Text>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
          >
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysHeader}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.dayHeaderText}>{day}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarDays.map((date, index) => {
            const status: MedicationStatus = date.isCurrentMonth ? "taken" : "none";
            
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.calendarCell,
                  selectedDate === date.dateStr && styles.selectedCell,
                  !date.isCurrentMonth && styles.otherMonthCell
                ]}
                onPress={() => date.isCurrentMonth && setSelectedDate(date.dateStr)}
                disabled={!date.isCurrentMonth}
              >
                <Text style={[
                  styles.dayText,
                  (date.isPreviousMonth || date.isNextMonth) && styles.otherMonthText,
                  selectedDate === date.dateStr && styles.selectedDayText
                ]}>
                  {date.day}
                </Text>
                {date.isCurrentMonth && status !== "none" && (
                  <View style={[
                    styles.statusDot,
                    status === "taken" ? styles.takenDot :
                    status === "some" ? styles.someDot :
                    styles.missedDot
                  ]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#e0f2fe", "#bae6fd", "#7dd3fc"]}
      style={styles.container}
    >
      <View style={styles.stickyHeader}>
        <Text style={styles.header}>Medication Calendar</Text>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderCalendar()}

        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.takenDot]} />
            <Text style={styles.legendText}>All medications taken</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.someDot]} />
            <Text style={styles.legendText}>Some medications skipped</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.missedDot]} />
            <Text style={styles.legendText}>Medications missed</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
          <Text style={styles.todayButtonText}>Go to Today</Text>
        </TouchableOpacity>

        {selectedDate && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Medications for <Text style={{ fontWeight: "bold" }}>{formatDisplayDate(selectedDate)}</Text>:
            </Text>
            <Text style={styles.medText}>💊 Metformin – 8:00 AM</Text>
            <Text style={styles.medText}>💊 Amlodipine – 12:00 PM</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2effd',
    paddingTop: 40,
    zIndex: 100,
  },
  header: {
    fontSize: 26,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#075985",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#075985",
  },
  monthText: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#075985",
  },
  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  dayHeaderText: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#374151",
    width: 40,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarCell: {
    width: "14.28%",
    alignItems: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  otherMonthCell: {
    opacity: 0.4,
  },
  selectedCell: {
    backgroundColor: "#dbeafe",
    borderRadius: 6,
    borderColor: "#3b82f6",
  },
  dayText: {
    fontFamily: "SpaceMono",
    color: "#1f2937",
    marginBottom: 4,
  },
  selectedDayText: {
    fontWeight: "bold",
    color: "#1e40af",
  },
  otherMonthText: {
    color: "#9ca3af",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  takenDot: {
    backgroundColor: "#10b981",
  },
  someDot: {
    backgroundColor: "#f59e0b",
  },
  missedDot: {
    backgroundColor: "#ef4444",
  },
  legendContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  legendTitle: {
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    color: "#075985",
    marginBottom: 12,
    fontSize: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontFamily: "SpaceMono",
    color: "#374151",
  },
  todayButton: {
    backgroundColor: "#0284c7",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  todayButtonText: {
    fontFamily: "SpaceMono",
    color: "#fff",
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    color: "#0c4a6e",
    marginBottom: 12,
  },
  medText: {
    fontSize: 15,
    fontFamily: "SpaceMono",
    color: "#374151",
    marginLeft: 6,
    marginTop: 4,
  },
});