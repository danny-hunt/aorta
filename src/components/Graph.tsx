import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Grid} from 'react-native-easy-grid';
import {YAxis, XAxis, LineChart} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';

type lineColors = ['purple', 'green', 'blue', 'red'];

export type GraphInput = {
  lineData: {date: Date; value: number}[];
  lineColor: string;
  max: number;
  min: number;
  numberOfTicks: number;
};

const Graph = ({one, two, day}: {one: GraphInput; two: GraphInput; day: boolean}) => {
  const {height, width} = useWindowDimensions();
  const firstLineData = [50, 10, 40, 95, -4, -24];
  // const firstLineData = [
  //   {
  //     value: 150,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 15),
  //   },
  //   {
  //     value: 10,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 18),
  //   },
  //   {
  //     value: 100,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 21),
  //   },
  //   {
  //     value: 20,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 24),
  //   },
  // ];
  const secondLineData = [1, 2, 3, 4, 5, 6];
  const fullData = [
    {
      data: firstLineData,
      svg: {stroke: 'purple', strokeWidth: 2},
    },
    {
      data: secondLineData,
      svg: {stroke: 'green', strokeWidth: 2},
    },
  ];

  const contentInset = {top: 20, bottom: 20};

  return (
    <>
      <View style={{height: width, flexDirection: 'row'}}>
        <YAxis
          style={{marginHorizontal: 3, height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={secondLineData}
          max={10}
          min={0}
          // numberOfTicks={10}
        />
        <View style={{marginLeft: 10}}>
          <LineChart style={{height: width}} data={fullData} contentInset={contentInset}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, height: width}}
            data={secondLineData}
            scale={scale.scaleTime}
            svg={{fontSize: 12, fill: 'black'}}
            // xAccessor={({item}) => item.date}
            formatLabel={index => index}
            // formatLabel={day ? value => dateFns.format(value, 'HH') : value => dateFns.format(value, 'HH')}
          />
        </View>
        <YAxis
          style={{marginHorizontal: 3, height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={firstLineData}
          numberOfTicks={10}
        />
      </View>
    </>
  );
};

export default Graph;
