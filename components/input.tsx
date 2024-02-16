import { Text, View, StyleSheet, TextInput } from 'react-native';
import { config } from './configs';
import { ComponentProps, useState } from 'react';

interface InputProps extends ComponentProps<typeof TextInput>{
    label: string
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>

      <TextInput
        {...props}
        style={styles.input}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: config.spaces.xs,
  },
  text: {
    fontWeight: "bold",
    fontSize: config.fontSizes.md,
    color: config.colors.Secoundary,
  },
  input: {
    paddingVertical: config.spaces.xs,
    paddingHorizontal: config.spaces.md,
    fontSize: config.fontSizes.md,
    backgroundColor: config.colors.complementary_1,
    color: config.colors.complementary_2,
    borderRadius: config.radius.sm,
  }
});
