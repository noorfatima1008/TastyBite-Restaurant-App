import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const statuses = ["Pending", "Preparing", "Ready", "Served"];

export default function OrderTrackingScreen() {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled || currentStatus >= statuses.length - 1) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStatus((previous) => previous + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentStatus, cancelled]);

  const cancelOrder = () => {
    setCancelled(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Order Tracking 🍽️</Text>
        <Text style={styles.subtitle}>Track your TastyBite order</Text>

        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>Order #TB1001</Text>
              <Text style={styles.orderDate}>Today • TastyBite</Text>
            </View>

            <Text style={styles.foodEmoji}>🍔</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Order Status</Text>

          {cancelled ? (
            <View style={styles.cancelledBox}>
              <Text style={styles.cancelledEmoji}>❌</Text>
              <Text style={styles.cancelledTitle}>Order Cancelled</Text>
              <Text style={styles.cancelledText}>
                Your order has been cancelled successfully.
              </Text>
            </View>
          ) : (
            <View style={styles.timeline}>
              {statuses.map((status, index) => {
                const completed = index <= currentStatus;
                const active = index === currentStatus;

                return (
                  <View key={status} style={styles.timelineRow}>
                    <View style={styles.timelineLeft}>
                      <View
                        style={[
                          styles.circle,
                          completed && styles.completedCircle,
                        ]}
                      >
                        <Text style={styles.circleText}>
                          {completed ? "✓" : ""}
                        </Text>
                      </View>

                      {index < statuses.length - 1 && (
                        <View
                          style={[
                            styles.line,
                            index < currentStatus && styles.completedLine,
                          ]}
                        />
                      )}
                    </View>

                    <View style={styles.statusContent}>
                      <Text
                        style={[
                          styles.statusText,
                          completed && styles.completedText,
                        ]}
                      >
                        {status}
                      </Text>

                      <Text style={styles.statusDescription}>
                        {index === 0 && "Your order has been received."}
                        {index === 1 && "Our kitchen is preparing your food."}
                        {index === 2 && "Your order is ready."}
                        {index === 3 && "Enjoy your delicious meal!"}
                      </Text>

                      {active && (
                        <Text style={styles.currentLabel}>CURRENT STATUS</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {!cancelled && currentStatus < 3 && (
            <Pressable style={styles.cancelButton} onPress={cancelOrder}>
              <Text style={styles.cancelText}>Cancel Order</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Delivery Information</Text>

          <Text style={styles.infoText}>📍 Delivery Address</Text>
          <Text style={styles.infoValue}>Your selected delivery address</Text>

          <Text style={styles.infoText}>💵 Payment</Text>
          <Text style={styles.infoValue}>Cash on Delivery</Text>

          <Text style={styles.infoText}>💰 Total</Text>
          <Text style={styles.infoValue}>Rs. 1,399</Text>
        </View>

        <Pressable
          style={styles.homeButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F8",
  },

  container: {
    flex: 1,
    padding: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  subtitle: {
    color: "#888",
    marginTop: 4,
    marginBottom: 18,
  },

  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderNumber: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333",
  },

  orderDate: {
    color: "#888",
    marginTop: 4,
  },

  foodEmoji: {
    fontSize: 42,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333",
    marginBottom: 16,
  },

  timeline: {
    marginBottom: 5,
  },

  timelineRow: {
    flexDirection: "row",
    minHeight: 72,
  },

  timelineLeft: {
    width: 35,
    alignItems: "center",
  },

  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  completedCircle: {
    backgroundColor: "#6A1B9A",
    borderColor: "#6A1B9A",
  },

  circleText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginVertical: 2,
  },

  completedLine: {
    backgroundColor: "#6A1B9A",
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#999",
  },

  completedText: {
    color: "#6A1B9A",
  },

  statusDescription: {
    color: "#888",
    fontSize: 12,
    marginTop: 3,
  },

  currentLabel: {
    color: "#C62828",
    fontSize: 10,
    fontWeight: "900",
    marginTop: 5,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: "#C62828",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },

  cancelText: {
    color: "#C62828",
    fontWeight: "800",
  },

  cancelledBox: {
    alignItems: "center",
    paddingVertical: 20,
  },

  cancelledEmoji: {
    fontSize: 42,
  },

  cancelledTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#C62828",
    marginTop: 8,
  },

  cancelledText: {
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 15,
    elevation: 2,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#333",
    marginBottom: 12,
  },

  infoText: {
    color: "#555",
    fontWeight: "700",
    marginTop: 8,
  },

  infoValue: {
    color: "#888",
    marginTop: 3,
  },

  homeButton: {
    backgroundColor: "#C62828",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 15,
  },

  homeButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
});
