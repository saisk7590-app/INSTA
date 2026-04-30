import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';

export function EditAvatarScreen() {
  const [avatar, setAvatar] = useState(
    'https://i.pravatar.cc/300?img=3'
  );

  const handleChangePhoto = () => {
    // 🔥 Later: open image picker
    console.log('Open gallery');
  };

  const handleRemovePhoto = () => {
    setAvatar('https://via.placeholder.com/300');
  };

  const handleSave = () => {
    console.log('Save avatar');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* 👤 AVATAR PREVIEW */}
        <Image source={{ uri: avatar }} style={styles.avatar} />

        {/* 🔄 CHANGE BUTTON */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleChangePhoto}>
          <Text style={styles.primaryText}>Change Photo</Text>
        </TouchableOpacity>

        {/* 🗑 REMOVE */}
        <TouchableOpacity onPress={handleRemovePhoto}>
          <Text style={styles.removeText}>Remove Photo</Text>
        </TouchableOpacity>

        {/* 💾 SAVE */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: colors.border,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 16,
  },

  primaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  removeText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 30,
  },

  saveButton: {
    width: '80%',
    backgroundColor: colors.text,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },

  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
