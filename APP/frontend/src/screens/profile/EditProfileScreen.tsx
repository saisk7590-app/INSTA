import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBar, ScreenContainer } from '../../components/common';
import { updateUserProfile } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { radii, spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  const { user, updateUser } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSave = fullName.trim().length > 0 && !loading;

  const handleSave = async () => {
    if (!canSave || !user?.id) return;
    
    setLoading(true);
    setError('');
    
    try {
      // 1. Update on the backend database
      const updatedData = await updateUserProfile(user.id, {
        fullName: fullName.trim(),
        bio: bio.trim(),
        location: location.trim(),
      });
      
      // 2. Update local state
      await updateUser({
        fullName: updatedData.fullName || fullName.trim(),
        bio: updatedData.bio || bio.trim(),
        location: updatedData.location || location.trim(),
      });
      
      // 3. Go back to Profile screen
      navigation.goBack();
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HeaderBar
          title="Edit Profile"
          leftAction="back"
          onLeftPress={() => navigation.goBack()}
        />

        <Text style={styles.hint}>Update your public information below.</Text>

        <View style={styles.form}>
          {/* Full Name Field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your full name"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          {/* Bio Field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Tell others about yourself"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              maxLength={150}
            />
            <Text style={styles.charCount}>{bio.length}/150</Text>
          </View>

          {/* Location Field */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. Banjara Hills"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={[styles.saveButton, !canSave && styles.buttonDisabled]}
            disabled={!canSave}
            onPress={handleSave}
          >
            {loading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const stylesFactory = (colors: any) => StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  hint: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
    ...typography.body,
  },
  form: {
    gap: spacing.lg,
  },
  fieldWrap: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text,
    ...typography.caption,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.text,
    ...typography.body,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  error: {
    color: colors.danger,
    ...typography.caption,
  },
  saveButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: colors.background,
    ...typography.subheading,
    fontWeight: 'bold',
  },
});
export default EditProfileScreen;
