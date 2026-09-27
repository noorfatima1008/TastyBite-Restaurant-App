import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useCart } from "../context/CartContext";

export default function CheckoutScreen() {
  const router = useRouter();

  const { items, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const deliveryFee = 100;
  const grandTotal = totalPrice + deliveryFee;

  const placeOrder = () => {
    if (!name || !phone || !address) {
      return;
    }

    clearCart();
    router.push("/order-tracking");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.subtitle}>Complete your order details</Text>

        {/* CUSTOMER DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Delivery Address"
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* PAYMENT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <Pressable
            style={[
              styles.paymentOption,
              payment === "Cash on Delivery" && styles.selectedPayment,
            ]}
            onPress={() => setPayment("Cash on Delivery")}
          >
            <Text style={styles.paymentText}>💵 Cash on Delivery</Text>
          </Pressable>

          <Pressable
            style={[
              styles.paymentOption,
              payment === "Card" && styles.selectedPayment,
            ]}
            onPress={() => setPayment("Card")}
          >
            <Text style={styles.paymentText}>💳 Card Payment</Text>
          </Pressable>
        </View>

        {/* ORDER SUMMARY */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {items.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.itemText}>
                {item.emoji} {item.name} x{item.quantity}
              </Text>

              <Text style={styles.itemPrice}>
                Rs. {item.price * item.quantity}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Subtotal</Text>

            <Text style={styles.value}>Rs. {totalPrice}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Delivery</Text>

            <Text style={styles.value}>Rs. {deliveryFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.totalValue}>Rs. {grandTotal}</Text>
          </View>
        </View>

        {/* PLACE ORDER */}
        <Pressable style={styles.orderButton} onPress={placeOrder}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.backButtonText}>Back to Cart</Text>
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
    padding: 18,
    paddingBottom: 30,
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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },

  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },

  paymentOption: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 13,
    marginBottom: 10,
  },

  selectedPayment: {
    borderColor: "#6A1B9A",
    backgroundColor: "#F5EAF8",
  },

  paymentText: {
    color: "#333",
    fontWeight: "700",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  itemText: {
    color: "#444",
    flex: 1,
    marginRight: 10,
  },

  itemPrice: {
    color: "#6A1B9A",
    fontWeight: "700",
  },

  label: {
    color: "#777",
  },

  value: {
    color: "#333",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "#222",
  },

  totalValue: {
    fontSize: 19,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  orderButton: {
    backgroundColor: "#C62828",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 5,
  },

  orderButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  backButton: {
    alignItems: "center",
    paddingVertical: 14,
  },

  backButtonText: {
    color: "#6A1B9A",
    fontWeight: "800",
  },
});
