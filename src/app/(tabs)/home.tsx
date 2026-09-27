import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>Welcome to</Text>
            <Text style={styles.brand}>TastyBite 🍴</Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hungry?</Text>

          <Text style={styles.heroText}>
            Discover delicious meals made specially for you.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/menu")}
          >
            <Text style={styles.primaryText}>Explore Menu</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>What would you like?</Text>

        <View style={styles.grid}>
          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/menu")}
          >
            <Text style={styles.optionIcon}>🍔</Text>
            <Text style={styles.optionTitle}>Order Food</Text>
            <Text style={styles.optionText}>Fresh meals & drinks</Text>
          </Pressable>

          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/reservation")}
          >
            <Text style={styles.optionIcon}>📅</Text>
            <Text style={styles.optionTitle}>Reserve Table</Text>
            <Text style={styles.optionText}>Book your table</Text>
          </Pressable>

          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/order-tracking")}
          >
            <Text style={styles.optionIcon}>📦</Text>
            <Text style={styles.optionTitle}>Track Order</Text>
            <Text style={styles.optionText}>Check your order</Text>
          </Pressable>

          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/about")}
          >
            <Text style={styles.optionIcon}>ℹ️</Text>
            <Text style={styles.optionTitle}>About Us</Text>
            <Text style={styles.optionText}>Learn about TastyBite</Text>
          </Pressable>
        </View>

        <View style={styles.offerCard}>
          <Text style={styles.offerBadge}>TODAY'S OFFER</Text>

          <Text style={styles.offerTitle}>20% OFF</Text>

          <Text style={styles.offerText}>
            Use code TASTY20 on your next order.
          </Text>
        </View>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  smallText: {
    color: "#777",
    fontSize: 13,
  },

  brand: {
    color: "#6A1B9A",
    fontSize: 27,
    fontWeight: "800",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3EAF7",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 23,
  },

  hero: {
    backgroundColor: "#6A1B9A",
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },

  heroText: {
    color: "#F5E9FA",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryText: {
    color: "#6A1B9A",
    fontWeight: "800",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#222",
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  optionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    minHeight: 140,
    elevation: 2,
  },

  optionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
  },

  optionText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    lineHeight: 17,
  },

  offerCard: {
    backgroundColor: "#C62828",
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
  },

  offerBadge: {
    color: "#FFDDE0",
    fontSize: 11,
    fontWeight: "800",
  },

  offerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },

  offerText: {
    color: "#fff",
    marginTop: 4,
  },
});

