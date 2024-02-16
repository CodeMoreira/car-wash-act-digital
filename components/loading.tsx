import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { config } from './configs';

interface LoadingProps {
    isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps) => {
  return !isLoading ? null : (
    <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={config.colors.Primary} />
    </View>
  );
};

export default Loading;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  loadingWrapper: {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#00000084",
    alignItems: "center",
    justifyContent: "center",
  }
});
