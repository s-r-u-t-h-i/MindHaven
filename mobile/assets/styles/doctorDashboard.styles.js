import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.background,
        flexGrow: 1,
    },

    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: COLORS.textPrimary,
    },

    card: {
        backgroundColor: COLORS.card,
        padding: 18,
        borderRadius: 14,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
        color: COLORS.textPrimary,
    },

    cardValue: {
        fontSize: 15,
        color: COLORS.textSecondary,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 15,
        color: COLORS.textPrimary,
    },

    actionButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    actionText: {
        color: COLORS.white,
        fontWeight: "bold",
        marginLeft: 8,
        fontSize: 16,
    },

    actionButtonSecondary: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    actionTextSecondary: {
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 8,
        fontSize: 16,
    },
});

export default styles;
