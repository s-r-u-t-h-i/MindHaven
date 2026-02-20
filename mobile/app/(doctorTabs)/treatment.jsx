import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/treatment.styles.js";

export default function Treatment() {

  const handleApprove = () => {
    Alert.alert("Treatment Approved", "The treatment plan has been successfully approved and saved.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Treatment Plan</Text>
      <Text style={styles.subtitle}>
        Clinical recommendation based on EEG analysis
      </Text>

      {/* Patient Info */}
      <View style={styles.patientCard}>
        <Ionicons name="person-outline" size={18} color="#2e86de" />
        <Text style={styles.patientText}>Patient: John Doe</Text>
      </View>

      {/* Condition Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Predicted Condition</Text>
        <View style={styles.conditionRow}>
          <Text style={styles.cardValue}>Moderate Anxiety Disorder</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Moderate</Text>
          </View>
        </View>
      </View>

      {/* Therapy Recommendation */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recommended Therapy</Text>
        <Text style={styles.cardValue}>
          • Cognitive Behavioral Therapy (CBT){"\n"}
          • Weekly Counseling Sessions{"\n"}
          • Mindfulness-Based Stress Reduction
        </Text>
      </View>

      {/* Medication */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medication Suggestion</Text>
        <Text style={styles.cardValue}>
          • Selective Serotonin Reuptake Inhibitors (SSRIs){"\n"}
          • Monitor response over 4 weeks{"\n"}
          • Regular follow-up evaluation
        </Text>
      </View>

      {/* Clinical Notes */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clinical Notes</Text>
        <Text style={styles.cardValue}>
          Patient shows moderate cognitive stress patterns in EEG analysis.
          Non-pharmacological interventions are recommended as first-line treatment.
        </Text>
      </View>

      {/* Approve Button */}
      <TouchableOpacity style={styles.button} onPress={handleApprove}>
        <Text style={styles.buttonText}>Approve & Save Treatment Plan</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}


