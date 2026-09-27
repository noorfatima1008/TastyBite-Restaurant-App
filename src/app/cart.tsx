import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const router = useRouter();

  const {
    items,
    totalItems,
    totalPrice,
    increaseItem,
    decreaseItem,
    removeItem,
  } = useCart();

  // EMPTY CART
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>

          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>

          <Text style={styles.emptyText}>
            Add some delicious food from our menu.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/checkout")}
          >
            <Text style={styles.primaryButtonText}>Browse Menu</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // CART WITH ITEMS
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Cart 🛒</Text>

            <Text style={styles.subtitle}>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </Text>
          </View>

          <Pressable onPress={() => router.push("/menu")}>
            <Text style={styles.addMore}>+ Add More</Text>
          </Pressable>
        </View>

        {/* CART ITEMS */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* FOOD ICON */}
              <View style={styles.foodIcon}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>

              {/* FOOD INFORMATION */}
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.price}>Rs. {item.price}</Text>

                {/* QUANTITY CONTROLS */}
                <View style={styles.controls}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => decreaseItem(item.id)}
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>{item.quantity}</Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => increaseItem(item.id)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </Pressable>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />

        {/* ORDER SUMMARY */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>

            <Text style={styles.summaryValue}>Rs. {totalPrice}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>

            <Text style={styles.summaryValue}>Rs. 100</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.totalValue}>Rs. {totalPrice + 100}</Text>
          </View>

          {/* CHECKOUT */}
          <Pressable
            style={styles.checkoutButton}
            onPress={() => router.navigate("/checkout" as any)}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  title: {
    color: "#6A1B9A",
    fontSize: 27,
    fontWeight: "900",
  },

  subtitle: {
    color: "#888",
    marginTop: 3,
  },

  addMore: {
    color: "#C62828",
    fontWeight: "800",
  },

  list: {
    paddingBottom: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    marginBottom: 12,
    elevation: 2,
  },

  foodIcon: {
    width: 75,
    height: 75,
    borderRadius: 15,
    backgroundColor: "#F5EAF8",
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 38,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    color: "#222",
    fontSize: 16,
    fontWeight: "800",
  },

  price: {
    color: "#6A1B9A",
    fontWeight: "800",
    marginTop: 4,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#F1E7F4",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    color: "#6A1B9A",
    fontSize: 20,
    fontWeight: "800",
  },

  quantity: {
    width: 35,
    textAlign: "center",
    fontWeight: "800",
    color: "#222",
  },

  removeButton: {
    marginLeft: 12,
  },

  removeText: {
    color: "#C62828",
    fontSize: 12,
    fontWeight: "700",
  },

  summary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 10,
    elevation: 3,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  summaryLabel: {
    color: "#777",
  },

  summaryValue: {
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

  checkoutButton: {
    backgroundColor: "#C62828",
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyEmoji: {
    fontSize: 60,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: "#333",
    marginTop: 15,
  },

  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#6A1B9A",
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
