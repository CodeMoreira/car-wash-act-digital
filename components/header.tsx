import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { config } from './configs';
import { router } from 'expo-router';

interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
            <AntDesign 
                name="arrowleft"
                size={config.fontSizes.lg}
                color={config.colors.Secoundary}
            />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: config.spaces.md,
    paddingVertical: config.spaces.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: config.spaces.md,
  },
  text: {
    fontSize: config.fontSizes.lg,
    color: config.colors.Secoundary,
    fontWeight: "bold",
  }
});
