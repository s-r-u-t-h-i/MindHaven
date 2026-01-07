import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import { formatPublishDate } from "../../lib/utils.js";
import Loader from "../../components/Loader.jsx";
import styles from "../../assets/styles/home.styles";
import COLORS from "../../constants/colors";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
    const { token } = useAuthStore();
    const [diagnoses, setDiagnoses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchDiagnoses = async (pageNum = 1, refresh = false) => {
        if (!token) return;

        try {
            if (refresh) setRefreshing(true);
            else if (pageNum === 1) setLoading(true);

            const response = await fetch(`${API_URL}/diagnoses?page=${pageNum}&limit=4`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch diagnoses");

            const uniqueDiagnoses =
                refresh || pageNum === 1
                    ? data.diagnoses
                    : Array.from(new Set([...diagnoses, ...data.diagnoses].map((d) => d._id))).map((id) =>
                        [...diagnoses, ...data.diagnoses].find((d) => d._id === id)
                    );

            setDiagnoses(uniqueDiagnoses);
            setHasMore(pageNum < data.totalPages);
            setPage(pageNum);

        } catch (error) {
            console.log("Error fetching diagnoses", error);
        } finally {
            if (refresh) {
                await sleep(800);
                setRefreshing(false);
            } else setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchDiagnoses();
    }, [token]);

    const handleLoadMore = async () => {
        if (hasMore && !loading && !refreshing) {
            await fetchDiagnoses(page + 1);
        }
    };

    const renderSeverityStars = (severity) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Ionicons
                key={i}
                name={i < severity ? "star" : "star-outline"}
                size={16}
                color={i < severity ? "#f44336" : COLORS.textSecondary} // red for severity
                style={{ marginRight: 2 }}
            />
        ));
    };

    const renderItem = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookHeader}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.user.username}</Text>
                </View>
            </View>
            <View style={styles.bookDetails}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>{renderSeverityStars(item.severity)}</View>
                <Text style={styles.caption}>{item.description}</Text>
                <Text style={styles.date}>
                    Recorded on {formatPublishDate(item.createdAt)}
                </Text>
            </View>
        </View>
    );

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <FlatList
                data={diagnoses}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => fetchDiagnoses(1, true)}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>MindHaven 🩺</Text>
                        <Text style={styles.headerSubtitle}>View diagnoses recorded 👇</Text>
                    </View>
                }
                ListFooterComponent={
                    hasMore && diagnoses.length > 0 ? (
                        <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
                    ) : null
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="medkit-outline" size={60} color={COLORS.textSecondary} />
                        <Text style={styles.emptyText}>No diagnoses recorded yet</Text>
                    </View>
                }
            />
        </View>
    );
}
