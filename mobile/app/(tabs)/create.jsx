import { useState } from "react";
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";

export default function CreateDiagnosis() {
    const [title, setTitle] = useState(""); // Condition Name
    const [description, setDescription] = useState(""); // Description
    const [severity, setSeverity] = useState(3); // Severity level
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { token } = useAuthStore();

    const handleSubmit = async () => {
        if (!title || !description || !severity) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/diagnoses`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    severity: severity.toString(),
                }),
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error("Invalid JSON response from server:", text);
                Alert.alert("Error", "Server returned invalid JSON (likely HTML error page)");
                return;
            }

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            Alert.alert("Success", "Diagnosis has been recorded!");
            setTitle("");
            setDescription("");
            setSeverity(3);
            router.push("/"); // go back to home or list page
        } catch (error) {
            console.error("Error creating diagnosis:", error);
            Alert.alert("Error", error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

   const severityLevels = [
  { level: 1, label: "Mild", icon: "leaf-outline", color: "#4CAF50" },
  { level: 2, label: "Low", icon: "pulse-outline", color: "#8BC34A" },
  { level: 3, label: "Moderate", icon: "warning-outline", color: "#FFC107" },
  { level: 4, label: "High", icon: "alert-circle-outline", color: "#FF9800" },
  { level: 5, label: "Critical", icon: "skull-outline", color: "#F44336" },
];

const renderSeverityPicker = () => {
  return (
    <View style={styles.severityContainer}>
      {severityLevels.map((item) => {
        const selected = severity === item.level;

        return (
          <TouchableOpacity
            key={item.level}
            onPress={() => setSeverity(item.level)}
            style={[
              styles.severityButton,
              selected && {
                borderColor: item.color,
                backgroundColor: `${item.color}20`,
              },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={selected ? item.color : COLORS.textSecondary}
            />
            <Text
              style={[
                styles.severityText,
                { color: selected ? item.color : COLORS.textSecondary },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Diagnosis</Text>
                        <Text style={styles.subtitle}>Record your patient's health condition</Text>
                    </View>

                    <View style={styles.form}>
                        {/* CONDITION NAME */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Condition Name</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="medkit-outline"
                                    size={20}
                                    color={COLORS.textSecondary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter condition name"
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        {/* SEVERITY */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Severity</Text>
                            {renderSeverityPicker()}
                        </View>

                        {/* DESCRIPTION */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Describe the diagnosis..."
                                placeholderTextColor={COLORS.placeholderText}
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                    <Ionicons
                                        name="cloud-upload-outline"
                                        size={20}
                                        color={COLORS.white}
                                        style={styles.buttonIcon}
                                    />
                                    <Text style={styles.buttonText}>Submit</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
