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
import styles from "../../assets/styles/dailyCheckIn.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";

export default function DailyConditionChecker() {
    const [responses, setResponses] = useState({
        lowMood: 0,
        anxiety: 0,
        fatigue: 0,
        sleepProblem: 0,
        concentrationIssue: 0,
    });

    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { token } = useAuthStore();

    const questions = [
        { key: "lowMood", label: "Felt sad or low today" },
        { key: "anxiety", label: "Felt anxious or nervous" },
        { key: "fatigue", label: "Experienced low energy or fatigue" },
        { key: "sleepProblem", label: "Had sleep difficulties" },
        { key: "concentrationIssue", label: "Had trouble concentrating" },
    ];

    const scaleOptions = [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several hours" },
        { value: 2, label: "Most of the day" },
        { value: 3, label: "Nearly all day" },
    ];

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);

            const response = await fetch(`${API_URL}/conditions`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionnaire: responses,
                    totalScore,
                    notes: notes || "No additional notes",
                    date: new Date().toISOString(),
                }),
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                Alert.alert("Error", "Invalid server response.");
                return;
            }

            if (!response.ok) throw new Error(data.message || "Submission failed");

            Alert.alert(
                "Success",
                "Daily check-in recorded successfully."
            );

            // Reset form
            setResponses({
                lowMood: 0,
                anxiety: 0,
                fatigue: 0,
                sleepProblem: 0,
                concentrationIssue: 0,
            });
            setNotes("");

        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const renderQuestion = (question) => (
        <View key={question.key} style={styles.formGroup}>
            <Text style={styles.label}>{question.label}</Text>

            <View style={styles.severityContainer}>
                {scaleOptions.map((option) => {
                    const selected = responses[question.key] === option.value;

                    return (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() =>
                                setResponses({
                                    ...responses,
                                    [question.key]: option.value,
                                })
                            }
                            style={[
                                styles.severityButton,
                                selected && {
                                    backgroundColor: "#4CAF5020",
                                    borderColor: "#4CAF50",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.severityText,
                                    {
                                        color: selected
                                            ? "#4CAF50"
                                            : COLORS.textSecondary,
                                    },
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                style={styles.scrollViewStyle}
            >
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Daily Mental Check-In</Text>
                        <Text style={styles.subtitle}>
                            Please answer the following questions about today.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {questions.map(renderQuestion)}

                        {/* Optional Notes */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>
                                Additional Notes (Optional)
                            </Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Any additional thoughts or details..."
                                placeholderTextColor={COLORS.placeholderText}
                                value={notes}
                                onChangeText={setNotes}
                                multiline
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        size={20}
                                        color={COLORS.white}
                                        style={styles.buttonIcon}
                                    />
                                    <Text style={styles.buttonText}>
                                        Save Check-In
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
