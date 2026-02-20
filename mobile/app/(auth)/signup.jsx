import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";

import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient"); // 🔥 NEW
    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, register } = useAuthStore();
    const router = useRouter();

    const handleSignUp = async () => {
        if (!role) {
            Alert.alert("Error", "Please select a role");
            return;
        }

        const result = await register(username, email, password, role);

        if (!result.success) {
            Alert.alert("Error", result.error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.card}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>MindHaven</Text>
                        <Text style={styles.subtitle}>
                            AI-Based Psychological Disorder Prediction & Treatment
                        </Text>
                    </View>

                    <View style={styles.formContainer}>

                        {/* ROLE SELECTION */}
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.label}>Register As</Text>

                            <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
                                <TouchableOpacity
                                    style={[
                                        styles.roleButton,
                                        role === "patient" && styles.roleButtonActive,
                                    ]}
                                    onPress={() => setRole("patient")}
                                >
                                    <Text
                                        style={[
                                            styles.roleText,
                                            role === "patient" && styles.roleTextActive,
                                        ]}
                                    >
                                        Patient
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.roleButton,
                                        role === "doctor" && styles.roleButtonActive,
                                    ]}
                                    onPress={() => setRole("doctor")}
                                >
                                    <Text
                                        style={[
                                            styles.roleText,
                                            role === "doctor" && styles.roleTextActive,
                                        ]}
                                    >
                                        Doctor
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* USERNAME INPUT */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="johndoe"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* EMAIL INPUT */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="johndoe@gmail.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* PASSWORD INPUT */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="******"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* SIGNUP BUTTON */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignUp}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        {/* FOOTER */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
