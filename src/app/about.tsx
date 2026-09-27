import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.backText}>← Home</Text>
        </Pressable>

        <View style={styles.logo}>
          <Text style={styles.logoText}>🍴</Text>
        </View>

        <Text style={styles.title}>About TastyBite</Text>

        <Text style={styles.subtitle}>Delicious food, made simple.</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Who We Are</Text>

          <Text style={styles.description}>
            TastyBite is a modern restaurant ordering app designed to make
            ordering food, reserving tables, and tracking orders simple and
            convenient.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Why Choose TastyBite?</Text>

          <View style={styles.feature}>
            <Text style={styles.icon}>🍔</Text>
            <View>
              <Text style={styles.featureTitle}>Fresh Food</Text>
              <Text style={styles.featureText}>
                Delicious meals prepared with care.
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.icon}>⚡</Text>
            <View>
              <Text style={styles.featureTitle}>Easy Ordering</Text>
              <Text style={styles.featureText}>
                Browse the menu and order in a few taps.
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.icon}>📍</Text>
            <View>
              <Text style={styles.featureTitle}>Order Tracking</Text>
              <Text style={styles.featureText}>
                Follow your order from preparation to serving.
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Text style={styles.icon}>📅</Text>
            <View>
              <Text style={styles.featureTitle}>Table Reservation</Text>
              <Text style={styles.featureText}>
                Reserve your preferred table easily.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Contact Us</Text>

          <Text style={styles.contact}>📧 tastybite@example.com</Text>
          <Text style={styles.contact}>📞 +92 300 1234567</Text>
          <Text style={styles.contact}>📍 Islamabad, Pakistan</Text>
        </View>

        <Text style={styles.footer}>TastyBite • Fresh food, happy moments</Text>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    marginBottom: 18,
  },

  backText: {
    color: "#6A1B9A",
    fontSize: 16,
    fontWeight: "800",
  },

  logo: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#6A1B9A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 12,
  },

  logoText: {
    fontSize: 40,
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 5,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
  },

  heading: {
    fontSize: 19,
    fontWeight: "900",
    color: "#333",
    marginBottom: 10,
  },

  description: {
    color: "#666",
    lineHeight: 22,
    fontSize: 14,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  icon: {
    fontSize: 27,
    width: 45,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333",
  },

  featureText: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  contact: {
    color: "#555",
    fontSize: 14,
    marginBottom: 12,
  },

  footer: {
    textAlign: "center",
    color: "#6A1B9A",
    fontWeight: "800",
    marginTop: 5,
  },

  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
});
