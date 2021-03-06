import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, useWindowDimensions, View} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {DebugTimeContext, RootStackParamList} from '../../App';
import {addCalorieRecord, getCalorieRecords} from '../database/calorie';
import {deleteRecord} from '../database/general';
import {addWeightRecord, getWeightRecords} from '../database/weight';
import {dayStart, dString} from '../utils/timeUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const DietScreen = ({navigation}: Props) => {
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  const {height, width} = useWindowDimensions();
  const [dailyRecords, setDailyRecords] = useState(getCalorieRecords(dayStart(debugTime || new Date())));
  const [dailyWeightRecords, setDailyWeightRecords] = useState(getWeightRecords(dayStart(debugTime || new Date())));
  const buttonOptions = [25, 50, 100];
  const secondButtonOptions = [200, 400, 1000];
  const [text, setText] = useState<string>('');

  const refetchDailyRecords = () => {
    setDailyRecords(getCalorieRecords(moment().startOf('day').toDate()));
  };

  const refetchDailyWeightRecords = () => {
    setDailyWeightRecords(getWeightRecords(moment().startOf('day').toDate()));
  };

  const addCalorieRecordHandler = (amount: number) => {
    addCalorieRecord(amount, debugTime || new Date());
    refetchDailyRecords();
  };

  const deleteCalorieRecordHandler = (recordId: string) => {
    deleteRecord('Calorie', recordId);
    refetchDailyRecords();
  };

  const addWeightRecordHandler = (amount: string) => {
    addWeightRecord(Number(amount), debugTime || new Date());
    refetchDailyWeightRecords();
  };

  const deleteWeightRecordHandler = (recordId: string) => {
    deleteRecord('Weight', recordId);
    refetchDailyWeightRecords();
  };

  const stringFromAmount = (amount: number): string => {
    let returnString = '+' + amount.toString();
    if (amount < 100) {
      returnString = ' ' + returnString;
    }
    if (amount < 1000) {
      returnString = ' ' + returnString;
    }
    return returnString;
  };

  const AddCalorieButton = ({amount}: {amount: number}) => (
    <View style={{width: '30%', height: 50, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
      <Button
        buttonStyle={{height: 50, width: 80}}
        key={amount}
        title={`${stringFromAmount(amount)}`}
        onPress={() => addCalorieRecordHandler(amount)}
      />
    </View>
  );

  return (
    <>
      <View style={{height: 40}}>
        <Grid>
          <Col>
            <Button title="Mood" onPress={() => navigation.navigate('Mood')} />
          </Col>
          <Col>
            <Button title="Diet" onPress={() => navigation.navigate('Diet')} />
          </Col>
          <Col>
            <Button title="Activity" onPress={() => navigation.navigate('Activity')} />
          </Col>
          <Col>
            <Button title="Sleep" onPress={() => navigation.navigate('Sleep')} />
          </Col>
        </Grid>
      </View>
      <ScrollView>
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{color: 'black'}}>This is {dailyRecords.sum('amount')}</Text>
          <View style={{paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
            {buttonOptions.map(amount => (
              <AddCalorieButton key={'acb' + amount} amount={amount} />
            ))}
          </View>
          <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
            {secondButtonOptions.map(amount => (
              <AddCalorieButton key={'acb' + amount} amount={amount} />
            ))}
          </View>
          <ScrollView style={{height: width}}>
            <Grid style={{height: width}}>
              {dailyRecords.map(record => (
                <Row key={record.recordID + 'row'}>
                  <Col size={1}>
                    <Text style={styles.titleText} key={record.recordID} onPress={() => deleteCalorieRecordHandler(record.recordID)}>
                      {`${dString(record.date)}`}
                    </Text>
                  </Col>
                  <Col size={1}>
                    <Text style={styles.titleText}>{`${record.amount}`}</Text>
                  </Col>
                </Row>
              ))}
            </Grid>
          </ScrollView>
          {dailyRecords.map(record => (
            <Text
              style={styles.titleText}
              key={record.recordID}
              onPress={() => deleteCalorieRecordHandler(record.recordID)}>{`${record.date} ${record.amount}`}</Text>
          ))}
          {dailyWeightRecords.map(record => (
            <Text
              style={styles.titleText}
              key={record.recordID}
              onPress={() => deleteWeightRecordHandler(record.recordID)}>{`${record.date} ${record.amount}`}</Text>
          ))}
          <TextInput
            style={{height: 80, marginTop: 'auto', color: 'black', fontSize: 20}}
            placeholder="Type here to enter weight!"
            keyboardType="numeric"
            placeholderTextColor={'black'}
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
          <Button title="Enter Weight" onPress={() => addWeightRecordHandler(text)} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DietScreen;
