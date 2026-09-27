import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useCart } from "../../context/CartContext";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  emoji: string;
  popular?: boolean;
};

const categories = ["All", "BBQ", "Chinese", "Fast Food", "Desserts", "Drinks"];

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Smoky BBQ Platter",
    category: "BBQ",
    price: 1299,
    rating: 4.8,
    emoji: "🍖",
    popular: true,
  },
  {
    id: "2",
    name: "Chicken Chow Mein",
    category: "Chinese",
    price: 699,
    rating: 4.7,
    emoji: "🍜",
  },
  {
    id: "3",
    name: "Crispy Chicken Wrap",
    category: "Fast Food",
    price: 549,
    rating: 4.6,
    emoji: "🌯",
  },
  {
    id: "4",
    name: "Loaded Fries",
    category: "Fast Food",
    price: 449,
    rating: 4.5,
    emoji: "🍟",
  },
  {
    id: "5",
    name: "Malai Tikka",
    category: "BBQ",
    price: 899,
    rating: 4.8,
    emoji: "🍢",
  },
  {
    id: "6",
    name: "Honey Wings",
    category: "BBQ",
    price: 749,
    rating: 4.7,
    emoji: "🍗",
  },
  {
    id: "7",
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 499,
    rating: 4.9,
    emoji: "🍫",
    popular: true,
  },
  {
    id: "8",
    name: "Mango Cheesecake",
    category: "Desserts",
    price: 599,
    rating: 4.8,
    emoji: "🍰",
  },
  {
    id: "9",
    name: "Mint Margarita",
    category: "Drinks",
    price: 299,
    rating: 4.6,
    emoji: "🍹",
  },
  {
    id: "10",
    name: "Peach Iced Tea",
    category: "Drinks",
    price: 279,
    rating: 4.5,
    emoji: "🧋",
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const { totalItems, addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Our Menu 🍽️</Text>
            <Text style={styles.subtitle}>Delicious food, made for you</Text>
          </View>

          <Pressable
            style={styles.cartButton}
            onPress={() => router.push("/cart" as any)}
          >
            <Text style={styles.cartButtonText}>🛒 {totalItems}</Text>
          </Pressable>
        </View>

        {/* SEARCH */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search food..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />

        {/* CATEGORIES */}
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />

        {/* MENU COUNT */}
        <Text style={styles.resultText}>
          {filteredItems.length} item
          {filteredItems.length !== 1 ? "s" : ""} available
        </Text>

        {/* MENU LIST */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
          renderItem={({ item }) => (
            <View style={styles.foodCard}>
              {/* FOOD IMAGE / EMOJI */}
              <View style={styles.foodImage}>
                <Text style={styles.foodEmoji}>{item.emoji}</Text>
              </View>

              {/* FOOD DETAILS */}
              <View style={styles.foodDetails}>
                <View style={styles.nameRow}>
                  <Text style={styles.foodName} numberOfLines={2}>
                    {item.name}
                  </Text>

                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.foodCategory}>{item.category}</Text>

                <View style={styles.bottomRow}>
                  <View>
                    <Text style={styles.rating}>★ {item.rating}</Text>

                    <Text style={styles.price}>Rs. {item.price}</Text>
                  </View>

                  <Pressable
                    style={styles.addButton}
                    onPress={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        emoji: item.emoji,
                      })
                    }
                  >
                    <Text style={styles.addButtonText}>+ Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        />
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
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 12,
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#6A1B9A",
  },

  subtitle: {
    color: "#888",
    marginTop: 3,
    fontSize: 13,
  },

  cartButton: {
    backgroundColor: "#6A1B9A",
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
  },

  cartButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5D9E8",
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },

  categoryList: {
    paddingVertical: 5,
    paddingRight: 10,
  },

  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E3D5E7",
  },

  categoryButtonActive: {
    backgroundColor: "#6A1B9A",
    borderColor: "#6A1B9A",
  },

  categoryText: {
    color: "#666",
    fontWeight: "700",
    fontSize: 13,
  },

  categoryTextActive: {
    color: "#FFFFFF",
  },

  resultText: {
    color: "#777",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
  },

  menuList: {
    paddingBottom: 20,
  },

  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  foodImage: {
    width: 100,
    height: 105,
    borderRadius: 15,
    backgroundColor: "#F5EAF8",
    alignItems: "center",
    justifyContent: "center",
  },

  foodEmoji: {
    fontSize: 50,
  },

  foodDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  foodName: {
    flex: 1,
    color: "#222",
    fontSize: 16,
    fontWeight: "900",
    marginRight: 5,
  },

  popularBadge: {
    backgroundColor: "#FFF0E0",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  popularText: {
    color: "#C62828",
    fontSize: 8,
    fontWeight: "900",
  },

  foodCategory: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },

  rating: {
    color: "#F59E0B",
    fontSize: 12,
    fontWeight: "800",
  },

  price: {
    color: "#6A1B9A",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4,
  },

  addButton: {
    backgroundColor: "#C62828",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 9,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },
});
