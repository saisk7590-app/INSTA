import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ArrowLeft, Phone, MapPin, ExternalLink, Heart, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, theme, typography } from '../../../theme';

const { width } = Dimensions.get('window');
const GRID_SPACING = 8;
const POST_SIZE = (width - 40 - GRID_SPACING) / 2;

const businessData = {
  name: "The Local Bakery",
  tagline: "Fresh baked goods every morning",
  bannerImage: "https://images.unsplash.com/photo-1649436401481-f4128d7a3585?w=1080",
  logoImage: "https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?w=200",
  distance: "250 m away",
  description: "Artisan bakery specializing in sourdough bread, croissants, and custom cakes. Family-owned since 2015.",
  posts: [
    { id: 1, image: "https://images.unsplash.com/photo-1649436401481-f4128d7a3585?w=400", likes: 45, comments: 8 },
    { id: 2, image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400", likes: 32, comments: 5 },
    { id: 3, image: "https://images.unsplash.com/photo-1524584830732-b69165ddba9a?w=400", likes: 67, comments: 12 },
    { id: 4, image: "https://images.unsplash.com/photo-1774268503699-5fad483fa226?w=400", likes: 28, comments: 4 },
  ]
};

export function BusinessProfile({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <Image source={{ uri: businessData.bannerImage }} style={styles.banner} />
        
        {/* Header Overlay */}
        <SafeAreaView style={styles.headerButtons} edges={['top']}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.profileSection}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={{ uri: businessData.logoImage }} style={styles.logo} />
          </View>
          
          <Text style={styles.name}>{businessData.name}</Text>
          <Text style={styles.distance}>{businessData.distance}</Text>
          <Text style={styles.tagline}>{businessData.tagline}</Text>
          
          {/* Actions */}
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.primaryButton}>
              <Phone size={18} color="white" />
              <Text style={styles.primaryButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton}>
              <MapPin size={18} color="white" />
              <Text style={styles.primaryButtonText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <ExternalLink size={18} color="#374151" />
              <Text style={styles.secondaryButtonText}>Visit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{businessData.description}</Text>
          
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.postGrid}>
            {businessData.posts.map((post) => (
              <View key={post.id} style={styles.postItem}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <View style={styles.stat}>
                    <Heart size={14} color="white" fill="white" />
                    <Text style={styles.statText}>{post.likes}</Text>
                  </View>
                  <View style={styles.stat}>
                    <MessageCircle size={14} color="white" fill="white" />
                    <Text style={styles.statText}>{post.comments}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  banner: {
    width: '100%',
    height: 240,
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileSection: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: -60,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: colors.background,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  distance: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 8,
    marginBottom: 20,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.border.radius.lg,
    gap: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: theme.border.radius.lg,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
  },
  postItem: {
    width: POST_SIZE,
    aspectRatio: 1,
    borderRadius: theme.border.radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    opacity: 0,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
