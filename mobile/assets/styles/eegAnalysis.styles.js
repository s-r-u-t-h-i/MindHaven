import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "JetBrainsMono-Medium",
    letterSpacing: 0.5,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusCardError: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },

  /* Patient Card */
  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  patientText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },

  stateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  stateButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  stateButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stateButtonText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: "600",
    textAlign: "center",
  },
  stateButtonTextSelected: {
    color: COLORS.white,
  },

  predictButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  predictButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  /* Result Card */
  resultCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 6,
  },
  resultConfidence: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  confidenceBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    marginTop: 10,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
