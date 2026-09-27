import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const initialOrders = [
  {
    id: "TB1025",
    customer: "Ayesha Khan",
    item: "Smoky BBQ Platter",
    amount: 1399,
    status: "Preparing",
  },
  {
    id: "TB1024",
    customer: "Ali Ahmed",
    item: "Chicken Chow Mein",
    amount: 799,
    status: "Ready",
  },
  {
    id: "TB1023",
    customer: "Sara Khan",
    item: "Crispy Chicken Wrap",
    amount: 649,
    status: "Pending",
  },
];

export default function ManagerScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      preparing: orders.filter((order) => order.status === "Preparing").length,
      ready: orders.filter((order) => order.status === "Ready").length,
    }),
    [orders],
  );

  const updateOrderStatus = (id: string) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== id) return order;

        let nextStatus = order.status;

        if (order.status === "Pending") {
          nextStatus = "Preparing";
        } else if (order.status === "Preparing") {
          nextStatus = "Ready";
        } else if (order.status === "Ready") {
          nextStatus = "Served";
        }

        return {
          ...order,
          status: nextStatus,
        };
      }),
    );
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>TastyBite</Text>
            <Text style={styles.title}>Manager Dashboard</Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsRow}>
          <StatCard title="Orders" value={stats.total} />
          <StatCard title="Pending" value={stats.pending} />
        </View>

        <View style={styles.statsRow}>
          <StatCard title="Preparing" value={stats.preparing} />
          <StatCard title="Ready" value={stats.ready} />
        </View>

        <Text style={styles.sectionTitle}>Quick Management</Text>

        <View style={styles.managementGrid}>
          <ManagementCard
            title="Menu Management"
            icon="🍔"
            onPress={() =>
              Alert.alert(
                "Menu Management",
                "Menu management is available in the MVP.",
              )
            }
          />

          <ManagementCard
            title="Reservations"
            icon="📅"
            onPress={() =>
              Alert.alert(
                "Reservations",
                "Reservation management is available in the MVP.",
              )
            }
          />

          <ManagementCard
            title="Customers"
            icon="👥"
            onPress={() =>
              Alert.alert(
                "Customers",
                "Customer management is available in the MVP.",
              )
            }
          />

          <ManagementCard
            title="Reports"
            icon="📊"
            onPress={() =>
              Alert.alert("Reports", "Reports are available in the MVP.")
            }
          />
        </View>

        <Text style={styles.sectionTitle}>Recent Orders</Text>

        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderTop}>
              <View>
                <Text style={styles.orderId}>#{order.id}</Text>
                <Text style={styles.customer}>{order.customer}</Text>
              </View>

              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            <Text style={styles.item}>{order.item}</Text>

            <View style={styles.orderBottom}>
              <Text style={styles.amount}>Rs. {order.amount}</Text>

              {order.status !== "Served" && (
                <Pressable
                  style={styles.updateButton}
                  onPress={() => updateOrderStatus(order.id)}
                >
                  <Text style={styles.updateText}>
                    {order.status === "Pending"
                      ? "Start Preparing"
                      : order.status === "Preparing"
                        ? "Mark Ready"
                        : "Mark Served"}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}

        <Pressable
          style={styles.homeButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ManagementCard({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.managementCard} onPress={onPress}>
      <Text style={styles.managementIcon}>{icon}</Text>
      <Text style={styles.managementTitle}>{title}</Text>
    </Pressable>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  smallText: {
    color: "#C62828",
    fontSize: 15,
    fontWeight: "700",
  },

  title: {
    color: "#6A1B9A",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 3,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#C62828",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  logoutText: {
    color: "#C62828",
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#222",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    elevation: 2,
  },

  statValue: {
    color: "#6A1B9A",
    fontSize: 27,
    fontWeight: "800",
  },

  statTitle: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },

  managementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  managementCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    elevation: 2,
  },

  managementIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  managementTitle: {
    color: "#333",
    fontSize: 14,
    fontWeight: "700",
  },

  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    color: "#6A1B9A",
    fontSize: 16,
    fontWeight: "800",
  },

  customer: {
    color: "#555",
    marginTop: 3,
  },

  statusBadge: {
    backgroundColor: "#F3E5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#6A1B9A",
    fontSize: 12,
    fontWeight: "700",
  },

  item: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 14,
  },

  orderBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  amount: {
    color: "#C62828",
    fontSize: 16,
    fontWeight: "800",
  },

  updateButton: {
    backgroundColor: "#6A1B9A",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  updateText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  homeButton: {
    backgroundColor: "#C62828",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 12,
  },

  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
