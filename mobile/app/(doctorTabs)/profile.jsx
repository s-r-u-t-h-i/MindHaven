import { useEffect, useState } from "react";
import {
  View,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/profile.styles";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setEditedUsername(user.username || "");
      setEditedEmail(user.email || "");
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!editedUsername.trim() || !editedEmail.trim()) {
      Alert.alert("Error", "Username and email cannot be empty");
      return;
    }

    try {
      setIsLoading(true);

      useAuthStore.setState((state) => ({
        user: {
          ...state.user,
          username: editedUsername,
        },
      }));

      Alert.alert("Success", "Profile updated successfully");
      setIsEditing(false);

    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user) return <Loader />;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ProfileHeader />
      <LogoutButton />

      {/* PROFILE DETAILS SECTION */}
      <View style={styles.profileSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-circle" size={24} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Profile Information</Text>
        </View>

        {/* Username */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Username</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedUsername}
              onChangeText={setEditedUsername}
              placeholder="Enter username"
              placeholderTextColor={COLORS.placeholderText}
            />
          ) : (
            <Text style={styles.infoValue}>
              {user?.username || "Not set"}
            </Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Email</Text>
          </View>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="Enter email"
              placeholderTextColor={COLORS.placeholderText}
              editable={false}
            />
          ) : (
            <Text style={styles.infoValue}>
              {user?.email || "Not set"}
            </Text>
          )}
        </View>

        {/* Specialization */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="medkit-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Specialization</Text>
          </View>
          <Text style={styles.infoValue}>
            {user?.specialization || "Psychiatrist"}
          </Text>
        </View>

        {/* Experience */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="briefcase-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.infoLabel}>Experience</Text>
          </View>
          <Text style={styles.infoValue}>
            {user?.experience || "5 Years"}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.saveButton]}
                onPress={handleSaveProfile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color={COLORS.white}
                    />
                    <Text style={styles.actionButtonText}>
                      Save Changes
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => {
                  setIsEditing(false);
                  setEditedUsername(user?.username || "");
                  setEditedEmail(user?.email || "");
                }}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={20}
                  color={COLORS.textPrimary}
                />
                <Text style={styles.actionButtonTextCancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons
                name="pencil-outline"
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.actionButtonText}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
