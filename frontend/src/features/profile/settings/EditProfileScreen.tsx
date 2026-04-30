import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';

export function EditProfileScreen() {
  const [name, setName] = useState('Sai Kiran');
  const [bio, setBio] = useState('Building apps for local businesses 🚀');
  const [location, setLocation] = useState('Madhapur, Hyderabad');
  const [radius, setRadius] = useState('2');

  const handleSave = () => {
    console.log({
      name,
      bio,
      location,
      radius,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 🔥 HEADER */}
        <Text style={styles.title}>Edit Profile</Text>

        {/* 👤 NAME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Your name"
          />
        </View>

        {/* ✍️ BIO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={[styles.input, styles.textArea]}
            placeholder="Tell people about you"
            multiline
          />
        </View>

        {/* 📍 LOCATION */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            style={styles.input}
            placeholder="Area / City"
          />
        </View>

        {/* 📏 RADIUS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Active Radius (km)</Text>

          <View style={styles.radiusRow}>
            {['1', '2', '5', '10'].map((r) => (
              <TouchableOpacity
                key={r}
                onPress={() => setRadius(r)}
                style={[
                  styles.radiusBtn,
                  radius === r && styles.radiusActive,
                ]}
              >
                <Text
                  style={[
                    styles.radiusText,
                    radius === r && styles.radiusTextActive,
                  ]}
                >
                  {r} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 💾 SAVE */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: colors.text,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.textSecondary,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  radiusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  radiusBtn: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },

  radiusActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  radiusText: {
    color: colors.text,
  },

  radiusTextActive: {
    color: 'white',
    fontWeight: '600',
  },

  saveButton: {
    marginTop: 30,
    backgroundColor: colors.text,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
