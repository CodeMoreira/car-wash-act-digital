import { Picker } from '@react-native-picker/picker';
import { ComponentProps } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { config } from './configs';

export interface SelectProps extends ComponentProps<typeof Picker> {
    label: string
    options: Array<{
        label: string
        value: any
    }>
}

const Select = ({ label, options, ...props }: SelectProps) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>

        <View style={styles.inputContainer}>
            <Picker {...props} style={styles.input}>
                {options.map(({ label, value }) => (
                    <Picker.Item label={label} value={value} key={label} />
                ))}
            </Picker>
        </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
    container: {
        gap: config.spaces.xs,
    },
    text: {
        fontWeight: "bold",
        fontSize: config.fontSizes.md,
        color: config.colors.Secoundary,
    },
    inputContainer: {
        backgroundColor: config.colors.complementary_1,
        borderRadius: config.radius.sm,
    },
    input: {
        marginVertical: -4,
        fontSize: config.fontSizes.md,
        color: config.colors.complementary_2,
    }
});
