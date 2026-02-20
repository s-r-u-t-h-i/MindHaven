import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/doctorDashboard.styles.js";

export default function DoctorDashboard() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.header}>Doctor Dashboard</Text>

            {/* Total Patients */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Ionicons name="people-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.cardTitle}>Total Patients</Text>
                </View>
                <Text style={styles.cardValue}>24 Registered Patients</Text>
            </View>

            {/* EEG Analysis */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Ionicons name="pulse-outline" size={24} color={COLORS.success} />
                    <Text style={styles.cardTitle}>EEG Analyses Today</Text>
                </View>
                <Text style={styles.cardValue}>5 EEG Reports Generated</Text>
            </View>

            {/* Treatment Plans */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Ionicons name="medkit-outline" size={24} color={COLORS.warning} />
                    <Text style={styles.cardTitle}>Treatment Plans</Text>
                </View>
                <Text style={styles.cardValue}>12 Active Treatment Plans</Text>
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push("eegAnalysis")}
            >
                <Ionicons name="pulse" size={20} color={COLORS.white} />
                <Text style={styles.actionText}>Start EEG Analysis</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButtonSecondary}
                onPress={() => router.push("treatment")}
            >
                <Ionicons name="medkit" size={20} color={COLORS.primary} />
                <Text style={styles.actionTextSecondary}>Create Treatment Plan</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

