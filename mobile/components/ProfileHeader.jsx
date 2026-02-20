import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <View style={styles.profileHeaderCentered}>
      {user.profileImage ? (
        <Image source={{ uri: user.profileImage }} style={styles.profileImageLarge} />
      ) : (
        <View style={styles.profileImagePlaceholder}>
          <Ionicons name="person" size={64} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}
