import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from '../../components/datePicker';
import Header from '../../components/header';
import { config } from '../../components/configs';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../components/input';
import Button from '../../components/button';
import Select, { SelectProps } from '../../components/select';
import { useEffect, useState } from 'react';
import searchForAvailableTimes from '../../services/searchForAvailableTimes';
import newSchedule, { newScheduleProps } from '../../services/newSchedule';
import { router } from 'expo-router';

const NewSchedule = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [availableTimes, setAvailableTimes] = useState<SelectProps["options"]>([])

  const { control, handleSubmit, formState: { errors }, watch } = useForm<newScheduleProps>({
    mode: 'onSubmit',
  });
  
  console.log('input errors:', errors)
  useEffect(() => {
    // Debounce for search by available times
    const handler = setTimeout(async () => {
      if (watch('date')) {
        setIsLoading(true)
  
        console.log(watch('date'))
        const { data, error } = await searchForAvailableTimes({ date: watch('date') })
  
        if (error) {
          console.log('setAvailableTimes error:', error)
        } else {
          setAvailableTimes(data.map(time => ({ label: time, value: time })))
        }
  
      }
      setIsLoading(false)
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [watch("date")]);

  const onSubmit = async (data: newScheduleProps) => {
    console.log(data)
    const { error } = await newSchedule(data)

    if (error) {
      console.log('onSubmit error:', error)
    } else {
      router.back()
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header title='Agendar' />
      <View style={styles.container}>
        <View style={styles.datePickerContainer}>
          {/* date picker */}
          <Controller
            control={control}
            name='date'
            rules={{
              required: 'Este campo é obrigatório',
            }}
            render={({ field: { onChange } }) => (<DatePicker onChange={onChange} />)
            }
          />
        </View>

        <View style={styles.inputsContainer}>
          {/* available time select */}
          <Controller
            control={control}
            name='time'
            rules={{
              required: 'Este campo é obrigatório',
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Horário'
                selectedValue={value}
                onValueChange={itemValue =>
                  onChange(itemValue)
                }
                options={[
                  { label: "Selecione um horário", value: null },
                  ...availableTimes
                ]}
              />
            )}
          />

          {/* wash type */}
          <Controller
            control={control}
            name='wash_type'
            rules={{
              required: 'Este campo é obrigatório',
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Tipo de lavagem'
                selectedValue={value}
                onValueChange={itemValue =>
                  onChange(itemValue)
                }
                options={[
                  { label: "Selecione um tipo", value: null },
                  { label: "Simples", value: "SIMPLES" },
                  { label: "Completa", value: "COMPLETA" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name='plate'
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/,
                message: 'Placa inválida. O formato correto é ABC1D23.'
              }
            }}
            render={({ field: { onChange, value } }) => (<Input value={value} onChangeText={onChange} label='Placa' placeholder='XXXXXXX'/>)}
          />
          <Button type='Primary' label='AGENDAR' onPress={handleSubmit(onSubmit)}/>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color={config.colors.Primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewSchedule;

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
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.Secoundary,
  },
  datePickerContainer: {
    padding: config.spaces.md,
  },
  inputsContainer: {
    flex: 1,
    borderTopLeftRadius: config.radius.lg,
    borderTopRightRadius: config.radius.lg,
    backgroundColor: config.colors.background,
    padding: config.spaces.md,
    justifyContent: "space-between",
  }
});
