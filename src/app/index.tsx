import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { users } from "../data/users";

export default function LoginScreen() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"customer" | "manager">("customer");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || !/\d/.test(password)) {
      newErrors.password =
        "Password must be 8+ characters and contain a number";
    }

    if (!isLogin && !confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();

    if (isLogin) {
      const foundUser = users.find(
        (user) =>
          user.email.toLowerCase() === cleanEmail &&
          user.password === password &&
          user.role === role,
      );

      setIsSubmitting(false);

      if (!foundUser) {
        Alert.alert(
          "Login Failed",
          "Email, password, or account type is incorrect.",
        );
        return;
      }

      // Replace login screen so user cannot go back to it
      if (foundUser.role === "manager") {
        router.replace("/manager");
      } else {
        router.replace("/home");
      }

      return;
    }

    setIsSubmitting(false);

    Alert.alert(
      "Account Created",
      "Your TastyBite account has been created successfully.",
      [
        {
          text: "Continue",
          onPress: () => {
            setIsLogin(true);
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});
          },
        },
      ],
    );
  };

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍴</Text>
          </View>

          <Text style={styles.brand}>TastyBite</Text>

          <Text style={styles.tagline}>Delicious food, made simple.</Text>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Login / Signup */}
            <View style={styles.switchRow}>
              <Pressable
                style={[styles.switchButton, isLogin && styles.activeSwitch]}
                onPress={() => switchMode(true)}
              >
                <Text
                  style={[
                    styles.switchText,
                    isLogin && styles.activeSwitchText,
                  ]}
                >
                  Login
                </Text>
              </Pressable>

              <Pressable
                style={[styles.switchButton, !isLogin && styles.activeSwitch]}
                onPress={() => switchMode(false)}
              >
                <Text
                  style={[
                    styles.switchText,
                    !isLogin && styles.activeSwitchText,
                  ]}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>

            <Text style={styles.title}>
              {isLogin ? "Welcome Back!" : "Create Account"}
            </Text>

            <Text style={styles.subtitle}>
              {isLogin
                ? "Sign in to continue to TastyBite"
                : "Join TastyBite and enjoy your favorite meals"}
            </Text>

            {/* Full Name */}
            {!isLogin && (
              <>
                <Text style={styles.label}>Full Name</Text>

                <TextInput
                  style={[styles.input, errors.fullName && styles.inputError]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);

                    if (errors.fullName) {
                      setErrors((previous) => ({
                        ...previous,
                        fullName: "",
                      }));
                    }
                  }}
                />

                {errors.fullName ? (
                  <Text style={styles.error}>{errors.fullName}</Text>
                ) : null}
              </>
            )}

            {/* Email */}
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => {
                setEmail(text);

                if (errors.email) {
                  setErrors((previous) => ({
                    ...previous,
                    email: "",
                  }));
                }
              }}
            />

            {errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            {/* Password */}
            <Text style={styles.label}>Password</Text>

            <View
              style={[
                styles.passwordContainer,
                errors.password && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);

                  if (errors.password) {
                    setErrors((previous) => ({
                      ...previous,
                      password: "",
                    }));
                  }
                }}
              />

              <Pressable
                onPress={() => setShowPassword((previous) => !previous)}
                hitSlop={10}
              >
                <Text style={styles.showText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>

            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            {/* Confirm Password */}
            {!isLogin && (
              <>
                <Text style={styles.label}>Confirm Password</Text>

                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);

                    if (errors.confirmPassword) {
                      setErrors((previous) => ({
                        ...previous,
                        confirmPassword: "",
                      }));
                    }
                  }}
                />

                {errors.confirmPassword ? (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                ) : null}
              </>
            )}

            {/* Account Type */}
            <Text style={styles.label}>Account Type</Text>

            <View style={styles.roleRow}>
              <Pressable
                style={[
                  styles.roleButton,
                  role === "customer" && styles.activeRole,
                ]}
                onPress={() => setRole("customer")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "customer" && styles.activeRoleText,
                  ]}
                >
                  👤 Customer
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.roleButton,
                  role === "manager" && styles.activeRole,
                ]}
                onPress={() => setRole("manager")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "manager" && styles.activeRoleText,
                  ]}
                >
                  🧑‍💼 Manager
                </Text>
              </Pressable>
            </View>

            {/* Submit Button */}
            <Pressable
              style={[
                styles.submitButton,
                isSubmitting && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitText}>
                  {isLogin ? "Login to TastyBite" : "Create Account"}
                </Text>
              )}
            </Pressable>
          </View>

          <Text style={styles.footer}>
            TastyBite • Fresh food, happy moments
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F8",
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#6A1B9A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 5,
  },

  logoEmoji: {
    fontSize: 38,
  },

  brand: {
    fontSize: 32,
    fontWeight: "800",
    color: "#6A1B9A",
  },

  tagline: {
    color: "#777777",
    marginTop: 4,
    marginBottom: 24,
    fontSize: 14,
  },

  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  switchRow: {
    flexDirection: "row",
    backgroundColor: "#F3EAF7",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },

  switchButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 9,
  },

  activeSwitch: {
    backgroundColor: "#6A1B9A",
  },

  switchText: {
    color: "#6A1B9A",
    fontWeight: "700",
  },

  activeSwitchText: {
    color: "#FFFFFF",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#252525",
  },

  subtitle: {
    color: "#777777",
    marginTop: 5,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 15,
    color: "#222222",
    backgroundColor: "#FAFAFA",
  },

  passwordContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  passwordInput: {
    flex: 1,
    color: "#222222",
  },

  showText: {
    color: "#C62828",
    fontWeight: "700",
  },

  inputError: {
    borderColor: "#C62828",
  },

  error: {
    color: "#C62828",
    fontSize: 12,
    marginTop: 4,
  },

  roleRow: {
    flexDirection: "row",
    gap: 10,
  },

  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },

  activeRole: {
    backgroundColor: "#F3EAF7",
    borderColor: "#6A1B9A",
  },

  roleText: {
    color: "#555555",
    fontWeight: "600",
  },

  activeRoleText: {
    color: "#6A1B9A",
  },

  submitButton: {
    backgroundColor: "#C62828",
    height: 52,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  disabledButton: {
    opacity: 0.65,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  footer: {
    color: "#999999",
    fontSize: 12,
    marginTop: 20,
  },
});
