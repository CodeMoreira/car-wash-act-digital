import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DefaultButtonProps } from './types';
import { config } from '../configs';

const Primary = ({ label, backgroundColor = config.colors.Primary, ...props}: DefaultButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} {...props}>
        <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      flexShrink: 0,
      paddingVertical: config.spaces.xs,
      paddingHorizontal: config.spaces.lg,
      borderRadius: config.radius.sm,
      alignItems: "center",
    },
    text: {
      fontSize: config.fontSizes.md,
      color: config.colors.background,
      fontWeight: "bold"
    }
})

export default Primary;
