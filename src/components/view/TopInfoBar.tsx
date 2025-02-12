import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GradiantProvider from '../providers/GradiantProvider';
import {ITopInfoBar} from '../../entities/commonObjects';
import {LeftArrowIcon} from '../../assets/svg';
import {COLOR} from '../../utils/colors';
import AvatarViewComponent from './AvatarViewComponent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {resetState} from '../../redux/slices/dataSlice';

const TopInfoBar = (props: ITopInfoBar) => {
  const {headerTitle, type} = props ?? {};
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const _headerContents = () => {
    if (type === 1) {
      return (
        <View style={styles.type1Container}>
          <Pressable
            onPress={() => {
              dispatch(resetState());
              navigation.goBack();
            }}>
            <LeftArrowIcon />
          </Pressable>
          <Text style={styles.type1Header}>{headerTitle}</Text>
          <View style={{opacity: 0}}>
            <AvatarViewComponent />
          </View>
        </View>
      );
    }
  };
  return (
    <GradiantProvider
      style={styles.topBarContainer}
      colors={['#6255FA', '#3B31B3']}>
      {_headerContents()}
    </GradiantProvider>
  );
};

export default TopInfoBar;

const styles = StyleSheet.create({
  topBarContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: 100,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  type1Header: {
    fontSize: 17,
    color: COLOR.white,
  },
  type1Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    marginTop: 15,
    marginHorizontal: 8,
  },
});
