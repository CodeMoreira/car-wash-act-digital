import { Text, View, StyleSheet, ScrollView, VirtualizedList, TouchableOpacity, FlatList } from 'react-native';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { config } from '../../components/configs';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import getSchedules from '../../services/getSchedules';
import Loading from '../../components/loading';
import { newScheduleProps } from '../../services/newSchedule';
import { router } from 'expo-router';

export interface scheduleData extends newScheduleProps {
  id: string;
  status: "PENDING" | "FINISHED" | "CANCELED"
}

const Item = ({ plate, wash_type, date, time, id  }: scheduleData) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push(`/schedule/details/${id}`)}>
      <View>
          <Text style={styles.buttonTitle}>{plate}</Text>
        <View style={styles.buttonDescriptionContainer}>
          <Text style={styles.buttonDescription}>{wash_type}</Text>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: config.colors.complementary_2 }}></View>
          <Text style={styles.buttonDescription}>{format(date, 'dd/MM/yy')} {time}</Text>
        </View>
      </View>
      <AntDesign name="arrowright" size={config.fontSizes.lg} color={config.colors.complementary_1} />
    </TouchableOpacity>
  )
}

const ListSchedules = () => {
  const [isLoading, setIsloading] = useState(true)
  const [list, setList] = useState<scheduleData[]>([])

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsloading(true)
      const { data, error } = await getSchedules()

      if (error) {
        console.log('fetchSchedules error:', error)
      } else {
        setList(data)
      }
      setIsloading(false)
    }
    fetchSchedules()
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header title='Agendamentos' />
      {!isLoading && list.length === 0 && (
        <Text style={styles.placeholderText}>Ainda não há nenhum agendamento.</Text>
      )}
      <FlatList
        style={styles.itemsContainer}
        data={list}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: config.spaces.lg}}></View>
          )}
        renderItem={({ item, index }) => (
          <>
            <Item {...item}  />
            {index === list.length - 1 && (
              <View style={{ width: "100%", height: 100}}></View>
            )}
          </>
        )}
      />
      <Loading isLoading={isLoading}/>
    </SafeAreaView>
  );
};

export default ListSchedules;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: config.colors.background,
  },
  placeholderText: {
    fontSize: config.fontSizes.md,
    textAlign: "center",
  },
  itemsContainer: {
    flex: 1,
    padding: config.spaces.md,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: config.spaces.md,
    paddingHorizontal: config.spaces.lg,
    width: "100%",
    backgroundColor: config.colors.background,
    borderRadius: config.radius.sm,
    shadowColor: "#00000076",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
  buttonTitle: {
    fontSize: config.fontSizes.lg,
    fontWeight: "bold",
    color: config.colors.Secoundary
  },
  buttonDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: config.spaces.xs,
  },
  buttonDescription: {
    fontSize: config.fontSizes.md,
    color: config.colors.complementary_2,
  },
});
