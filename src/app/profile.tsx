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

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState("Ayesha Khan");
  const [email, setEmail] = useState("customer@tastybite.com");
  const [phone, setPhone] = useState("0300-1234567");
  const [editing, setEditing] = useState(false);

  const saveProfile = () => {
    setEditing(false);

    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully.",
    );
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
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

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.title}>My Profile</Text>

          <Text style={styles.subtitle}>Manage your TastyBite account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            value={name}
            editable={editing}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            value={email}
            editable={editing}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            value={phone}
            editable={editing}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />

          <Pressable
            style={styles.editButton}
            onPress={() => {
              if (editing) {
                saveProfile();
              } else {
                setEditing(true);
              }
            }}
          >
            <Text style={styles.editButtonText}>
              {editing ? "Save Changes" : "Edit Profile"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable style={styles.option}>
            <Text style={styles.optionIcon}>📦</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>My Orders</Text>

              <Text style={styles.optionText}>View your recent orders</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => router.push("/reservation")}
          >
            <Text style={styles.optionIcon}>📅</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Reservations</Text>

              <Text style={styles.optionText}>
                Manage your table reservations
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => router.push("/about")}
          >
            <Text style={styles.optionIcon}>ℹ️</Text>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>About TastyBite</Text>

              <Text style={styles.optionText}>
                Learn more about our restaurant
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </Pressable>

        <Text style={styles.version}>TastyBite v1.0.0</Text>
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
    paddingBottom: 35,
  },

  backButton: {
    marginBottom: 15,
  },

  backText: {
    color: "#6A1B9A",
    fontSize: 16,
    fontWeight: "800",
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6A1B9A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  subtitle: {
    color: "#777",
    marginTop: 4,
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
    marginBottom: 10,
  },

  label: {
    color: "#555",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
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

  editButton: {
    backgroundColor: "#6A1B9A",
    borderRadius: 11,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 18,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  optionIcon: {
    fontSize: 25,
    width: 42,
  },

  optionInfo: {
    flex: 1,
  },

  optionTitle: {
    color: "#333",
    fontWeight: "800",
    fontSize: 15,
  },

  optionText: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  arrow: {
    color: "#6A1B9A",
    fontSize: 28,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#C62828",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
  },

  logoutText: {
    color: "#C62828",
    fontSize: 15,
    fontWeight: "900",
  },

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 18,
  },
});
