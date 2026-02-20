import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/eegAnalysis.styles.js";
import COLORS from "../../constants/colors.js";
import { makePrediction, checkAIHealth } from "../../services/aiService.js";
import Loader from "../../components/Loader.jsx";

const COGNITIVE_STATES = {
  0: { name: "Drowsy / Low Engagement", icon: "moon-outline", color: "#9E9E9E" },
  1: { name: "Relaxed / Neutral", icon: "leaf-outline", color: "#4CAF50" },
  2: { name: "Focused / High Engagement", icon: "flash-outline", color: "#2196F3" },
};

export default function Simulation() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState(null);
  const [apiHealthy, setApiHealthy] = useState(false);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      await checkAIHealth();
      setApiHealthy(true);
    } catch (error) {
      setApiHealthy(false);
    }
  };

  const handleSimulate = async (state) => {
    try {
      setLoading(true);
      setSelectedState(state);

      const response = await makePrediction({
        mode: "synthetic",
        state: state,
      });

      setResult(response);
    } catch (error) {
      Alert.alert("Error", error.message || "Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    try {
      setLoading(true);
      setSelectedState(null);

      const response = await makePrediction({ mode: "synthetic" });

      setResult(response);
    } catch (error) {
      Alert.alert("Error", error.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkAPIHealth();
    setRefreshing(false);
  };

  if (loading && !result) return <Loader />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EEG Analysis🧠</Text>
        <Text style={styles.headerSubtitle}>
          Analyze cognitive states using EEG signals
        </Text>
      </View>

      <View style={[styles.statusCard, !apiHealthy && styles.statusCardError]}>
        <Ionicons
          name={apiHealthy ? "checkmark-circle" : "close-circle"}
          size={20}
          color={apiHealthy ? "#4CAF50" : "#F44336"}
        />
        <Text style={styles.statusText}>
          {apiHealthy ? "API Connected" : "API Disconnected"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Select Cognitive State</Text>
        <View style={styles.stateButtonsContainer}>
          {[0, 1, 2].map((state) => (
            <TouchableOpacity
              key={state}
              style={[styles.stateButton, selectedState === state && styles.stateButtonSelected]}
              onPress={() => handleSimulate(state)}
              disabled={loading || !apiHealthy}
            >
              <Ionicons
                name={COGNITIVE_STATES[state].icon}
                size={24}
                color={selectedState === state ? COLORS.white : COGNITIVE_STATES[state].color}
              />
              <Text style={styles.stateButtonText}>
                {COGNITIVE_STATES[state].name.split(" / ")[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.predictButton}
        onPress={handlePredict}
        disabled={loading || !apiHealthy}
      >
        <Ionicons name="flash" size={20} color={COLORS.white} />
        <Text style={styles.predictButtonText}>Predict</Text>
      </TouchableOpacity>

      {loading && result && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </ScrollView>
  );
}
