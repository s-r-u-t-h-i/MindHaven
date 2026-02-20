import { useEffect, useState } from "react";
import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import { formatPublishDate } from "../../lib/utils.js";
import Loader from "../../components/Loader.jsx";
import styles from "../../assets/styles/patientDashboard.styles.js";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const { token } = useAuthStore();
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCheckIns = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/conditions?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setCheckIns(data.conditions);
    } catch (error) {
      console.log("Error fetching check-ins", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, [token]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCheckIns();
    }, [token])
  );

  // =============================
  // MOOD + SEVERITY LOGIC
  // =============================

  const getMoodLevel = (score) => {
    if (score <= 3) return 5;
    if (score <= 6) return 4;
    if (score <= 9) return 3;
    if (score <= 12) return 2;
    return 1;
  };

  const getSeverity = (score) => {
    if (score <= 5) return { label: "Low", color: "#4CAF50" };
    if (score <= 10) return { label: "Moderate", color: "#FF9800" };
    return { label: "Severe", color: "#F44336" };
  };

  const MOOD_ICONS = {
    1: { emoji: "😢", label: "Terrible" },
    2: { emoji: "😞", label: "Bad" },
    3: { emoji: "😐", label: "Okay" },
    4: { emoji: "🙂", label: "Good" },
    5: { emoji: "😄", label: "Great" },
  };

  // =============================
  // WEEKLY CHART DATA
  // =============================

  const last7 = checkIns.slice(0, 7).reverse();

  const chartData = {
    labels: last7.map((item) =>
      new Date(item.date).toLocaleDateString("en-IN", { weekday: "short" })
    ),
    datasets: [
      {
        data: last7.map((item) => 15 - item.totalScore), // invert for better mood upward
      },
    ],
  };

  const renderItem = ({ item }) => {
    const moodLevel = getMoodLevel(item.totalScore || 0);
    const moodInfo = MOOD_ICONS[moodLevel];
    const severity = getSeverity(item.totalScore || 0);

    return (
      <View style={styles.bookCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 32 }}>{moodInfo.emoji}</Text>

          {/* Severity Badge */}
          <View
            style={{
              backgroundColor: severity.color + "20",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: severity.color, fontWeight: "600" }}>
              {severity.label}
            </Text>
          </View>
        </View>

        <Text style={[styles.bookTitle, { marginTop: 6 }]}>
          {moodInfo.label}
        </Text>

        {/* Questionnaire Breakdown */}
        <View style={{ marginTop: 10 }}>
          {Object.entries(item.questionnaire || {}).map(([key, value]) => (
            <Text key={key} style={styles.caption}>
              {key}: {value}
            </Text>
          ))}
        </View>

        {/* Notes */}
        {item.notes && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: "600" }}>Notes:</Text>
            <Text style={styles.caption}>{item.notes}</Text>
          </View>
        )}

        <Text style={styles.date}>
          {formatPublishDate(item.date || item.createdAt)}
        </Text>
      </View>
    );
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={checkIns}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchCheckIns();
            }}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>MindHaven 💭</Text>
              <Text style={styles.headerSubtitle}>
                Your weekly mood trend 📊
              </Text>
            </View>

            {/* Weekly Chart */}
            {last7.length > 0 && (
              <LineChart
                data={chartData}
                width={screenWidth - 30}
                height={220}
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  labelColor: () => "#555",
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            )}
          </>
        }
      />
    </View>
  );
}
