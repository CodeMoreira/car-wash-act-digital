import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, Dimensions } from 'react-native';
import findScheduleById from '../../../services/findScheduleById';
import { scheduleData } from '../list';
import Header from '../../../components/header';
import Loading from '../../../components/loading';
import { config } from '../../../components/configs';
import { format } from 'date-fns';
import Button from '../../../components/button';
import updateSchedule from '../../../services/updateStatus';

const Details = () => {
    const { id } = useLocalSearchParams()
    const [isLoading, setIsloading] = useState(true)
    const [showFinishModal, setShowFinishModal] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [data, setData] = useState<scheduleData | null>(null)

    useEffect(() => {
        const fetchSchedule = async () => {
            setIsloading(true)
            const { data, error } = await findScheduleById({ id: id as string })

            if (error) {
                console.log('fetchSchedule error:', error)
            } else {
                setData(data)
            }
            setIsloading(false)
        }
        fetchSchedule()
    }, [id])

    const convertStatus = {
        FINISHED: "Finalizado",
        CANCELED: "Cancelado",
    }

    const submit = (status: scheduleData["status"]) => {
        updateSchedule({ id: id as string, status })
        router.back()
    }

  return (
    <View>
        <Header title='Detalhes'/>

        <View style={styles.container}>
            {!data && isLoading ? (
                <Text style={styles.value}>Algo deu errado, tente novamente mais tarde.</Text>
            ) : (
                <>
                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>Placa:</Text>
                        <Text style={styles.value}>{data!.plate}</Text>
                    </View>
                    
                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>Dia:</Text>
                        <Text style={styles.value}>{format(data!.date, 'dd/MM/yyyy')}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>Horário:</Text>
                        <Text style={styles.value}>{data!.time}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.title}>Tipo de lavagem:</Text>
                        <Text style={styles.value}>{data!.wash_type}</Text>
                    </View>

                    {data!.status !== "PENDING" ? (
                        <Text style={[styles.title, { textAlign: "center" }]}>Esse agendamento foi {convertStatus[data!.status]}</Text>
                    ) : (
                        <View style={styles.buttonsContainer}>
                            <Button label='Concluir' type='Primary' onPress={() => setShowFinishModal(true)}/>
                            <Button label='Cancelar' type='Primary' backgroundColor={config.colors.something_bad} onPress={() => setShowCancelModal(true)}/>
                        </View>
                    )}

                    <Modal
                        animationType="slide"
                        transparent
                        visible={showFinishModal}
                        onRequestClose={() => {
                            setShowFinishModal(false);
                        }}
                    >
                        <View style={styles.wrapperModal}>
                            <View style={styles.containerModal}>
                                <Text style={[styles.title, { textAlign: "center" }]}>Concluir</Text>
                                <Text style={styles.text}>Ao marcar uma lavagem como concluida você estará dizendo que o serviço foi finalizado. Tem certeza que deseja continuar?</Text>

                                <View style={styles.buttonsContainer}>
                                    <Button label='Concluir' type='Primary' onPress={() => submit("FINISHED")}/>
                                    <Button label='Voltar' type='Secoundary' onPress={() => setShowFinishModal(false)}/>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent
                        visible={showCancelModal}
                        onRequestClose={() => {
                            setShowCancelModal(false);
                        }}
                    >
                        <View style={styles.wrapperModal}>
                            <View style={styles.containerModal}>
                                <Text style={[styles.title, { textAlign: "center" }]}>Cancelar</Text>
                                <Text style={styles.text}>Ao cancelar uma lavagem você estará dizendo que a lavagem não irá mais acontecer. Tem certeza de que deseja continuar?</Text>

                                <View style={styles.buttonsContainer}>
                                    <Button label='Cancelar' type='Primary' onPress={() => submit("CANCELED")}/>
                                    <Button label='Voltar' type='Secoundary' onPress={() => setShowCancelModal(false)}/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </View>
      <Loading isLoading={isLoading}/>
    </View>
  );
};

export default Details;


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    padding: config.spaces.md,
    gap: config.spaces.sm,
  },
  rowContainer: {
    flexDirection: "row",
    gap: config.spaces.md,
  },
  title: {
    fontSize: config.fontSizes.md,
    fontWeight: "bold",
    color: config.colors.Secoundary,
  },
  value: {
    fontSize: config.fontSizes.md,
    color: config.colors.complementary_2,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: config.spaces.xs,
  },
  text: {
    fontSize: config.fontSizes.sm,
    textAlign: "center",
  },
  wrapperModal: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "#00000084",
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    width: 300,
    padding: config.spaces.sm,
    borderRadius: config.radius.sm,
    backgroundColor: config.colors.background,
    gap: config.spaces.sm,
  }
});
