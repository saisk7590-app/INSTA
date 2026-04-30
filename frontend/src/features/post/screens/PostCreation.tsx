import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { X, Image as ImageIcon, MapPin, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

export function PostCreation({ navigation }: any) {
  const [caption, setCaption] = useState('');
  const [hasImage, setHasImage] = useState(false);
  
  const handlePost = () => {
    navigation.navigate('HomeFeed');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeFeed')}>
          <X size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Photo Upload Area */}
        <View style={styles.section}>
          <Text style={styles.label}>Photo</Text>
          <TouchableOpacity 
            style={styles.imageUploadArea}
            onPress={() => setHasImage(!hasImage)}
          >
            {!hasImage ? (
              <View style={styles.uploadPlaceholder}>
                <ImageIcon size={64} color={colors.textSecondary} />
                <Text style={styles.uploadText}>Tap to upload photo</Text>
              </View>
            ) : (
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080' }} 
                style={styles.previewImage}
              />
            )}
          </TouchableOpacity>
        </View>
        
        {/* Caption */}
        <View style={styles.section}>
          <Text style={styles.label}>Caption</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Write a caption..."
            value={caption}
            onChangeText={setCaption}
            style={styles.captionInput}
            textAlignVertical="top"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationCard}>
            <MapPin size={20} color={colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>Nearby</Text>
              <Text style={styles.locationSubtitle}>Visible within 500 m radius</Text>
            </View>
          </View>
          <Text style={styles.locationNote}>
            Your post will be visible to people within 500 meters of your current location.
          </Text>
        </View>
        
        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionLabel}>Tag People</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionLabel}>Add Music</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  content: {
    flex: 1,
    padding: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  imageUploadArea: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: theme.border.radius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  captionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: theme.border.radius.lg,
    padding: spacing.lg,
    height: 120,
    fontSize: 16,
    color: colors.text,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    borderRadius: theme.border.radius.lg,
  },
  locationInfo: {
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#581C87',
  },
  locationSubtitle: {
    fontSize: 12,
    color: '#7E22CE',
  },
  locationNote: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  optionsContainer: {
    marginTop: 8,
    paddingBottom: 40,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: theme.border.radius.lg,
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
});
