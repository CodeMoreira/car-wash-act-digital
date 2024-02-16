import { StyleSheet } from 'react-native';
import Button from '../components/button';
import Input from '../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { config } from '../components/configs';
import DatePicker from '../components/datePicker';
import { router } from 'expo-router';
import Header from '../components/header';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button label='Agendar' type='Primary' onPress={() => router.push('/schedule/new')}/>
      <Button label='Ver agendamentos' type='Primary' onPress={() => router.push('/schedule/list')}/>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: config.spaces.md,
    flex: 1,
    gap: config.spaces.lg,
    justifyContent: "center",
    backgroundColor: config.colors.background,
  }
});
