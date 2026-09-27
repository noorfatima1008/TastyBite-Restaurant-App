import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const tables = ["Table 1", "Table 2", "Table 3", "Table 4"];

export default function ReservationScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedTable, setSelectedTable] = useState("Table 1");

  const makeReservation = () => {
    if (!name.trim() || !date.trim() || !time.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your name, date and time.",
      );
      return;
    }

    Alert.alert(
      "Reservation Confirmed 🎉",
      `Your table has been reserved successfully.\n\nTable: ${selectedTable}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}`,
      [
        {
          text: "Done",
          onPress: () => router.replace("/home"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Pressable
          onPress={() => router.replace("/home")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Home</Text>
        </Pressable>

        <Text style={styles.title}>Reserve a Table 🍽️</Text>

        <Text style={styles.subtitle}>Book your table at TastyBite</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reservation Details</Text>

          <Text style={styles.label}>Your Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Date</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 28 September 2026"
            placeholderTextColor="#999"
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Time</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. 7:30 PM"
            placeholderTextColor="#999"
            value={time}
            onChangeText={setTime}
          />

          <Text style={styles.label}>Number of Guests</Text>

          <View style={styles.guestRow}>
            {["2", "3", "4", "5", "6"].map((number) => (
              <Pressable
                key={number}
                style={[
                  styles.guestButton,
                  guests === number && styles.selectedButton,
                ]}
                onPress={() => setGuests(number)}
              >
                <Text
                  style={[
                    styles.guestText,
                    guests === number && styles.selectedText,
                  ]}
                >
                  {number}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Table</Text>

          {tables.map((table) => (
            <Pressable
              key={table}
              style={[
                styles.tableButton,
                selectedTable === table && styles.selectedTable,
              ]}
              onPress={() => setSelectedTable(table)}
            >
              <Text style={styles.tableEmoji}>🪑</Text>

              <View style={styles.tableInfo}>
                <Text
                  style={[
                    styles.tableName,
                    selectedTable === table && styles.selectedTableText,
                  ]}
                >
                  {table}
                </Text>

                <Text style={styles.tableCapacity}>Comfortable seating</Text>
              </View>

              <Text style={styles.radio}>
                {selectedTable === table ? "●" : "○"}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.reserveButton} onPress={makeReservation}>
          <Text style={styles.reserveText}>Confirm Reservation</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F8",
  },

  container: {
    padding: 20,
    paddingBottom: 30,
  },

  backButton: {
    marginBottom: 15,
  },

  backText: {
    color: "#6A1B9A",
    fontWeight: "800",
    fontSize: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  subtitle: {
    color: "#777",
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333",
    marginBottom: 12,
  },

  label: {
    color: "#444",
    fontWeight: "700",
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 11,
    paddingHorizontal: 13,
    backgroundColor: "#FAFAFA",
    color: "#222",
  },

  guestRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
  },

  guestButton: {
    width: 45,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedButton: {
    backgroundColor: "#6A1B9A",
    borderColor: "#6A1B9A",
  },

  guestText: {
    color: "#555",
    fontWeight: "800",
  },

  selectedText: {
    color: "#FFFFFF",
  },

  tableButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  selectedTable: {
    borderColor: "#6A1B9A",
    backgroundColor: "#F3EAF7",
  },

  tableEmoji: {
    fontSize: 28,
  },

  tableInfo: {
    flex: 1,
    marginLeft: 12,
  },

  tableName: {
    fontWeight: "800",
    color: "#333",
    fontSize: 15,
  },

  selectedTableText: {
    color: "#6A1B9A",
  },

  tableCapacity: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  radio: {
    fontSize: 22,
    color: "#6A1B9A",
  },

  reserveButton: {
    backgroundColor: "#C62828",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
  },

  reserveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
});
