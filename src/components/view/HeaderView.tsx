import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HeaderProps} from '../../entities/commonObjects';
import {theme} from '../../utils/theme';
import GradiantProvider from '../providers/GradiantProvider';
import {COLOR} from '../../utils/colors';
import {EditIcon, LeftArrowIcon, NotificationIcon} from '../../assets/svg';
import AvatarViewComponent from './AvatarViewComponent';
import {useNavigation} from '@react-navigation/native';

const HeaderView = (props: HeaderProps) => {
  const {headerTitle, type} = props ?? {};
  const navigation = useNavigation();
  if (type === 1) {
    return (
      <View style={styles.headerBackground}>
        <View>
          <Text>icon</Text>
        </View>
        <View>
          <Text style={[{color: theme.white}, styles.headerTitleType1]}>
            {headerTitle}
          </Text>
        </View>
        <View>
          <Text>icon</Text>
        </View>
      </View>
    );
  } else if (type === 2) {
    return (
      <GradiantProvider
        colors={['#6255FA', '#3B31B3']}
        style={styles.gradiantContainer}>
        <View style={styles.type2Container}>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Text style={[{color: theme.white}, styles.headerTitleType1]}>
              {headerTitle}
            </Text>
            <Text style={styles.sbuHeading}>
              There are 3 new events in your area.
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Pressable>
              <NotificationIcon />
            </Pressable>
            <Pressable>
              <AvatarViewComponent />
            </Pressable>
          </View>
        </View>
      </GradiantProvider>
    );
  } else if (type === 3) {
    return (
      <GradiantProvider
        colors={['#6255FA', '#3B31B3']}
        style={styles.thirdSection}>
        <View style={styles.type3Container}>
          <Pressable onPress={() => navigation.goBack()}>
            <LeftArrowIcon />
          </Pressable>
          <View>
            <Text style={[{color: theme.white}, styles.headerTitleType1]}>
              {headerTitle}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Pressable>
              <AvatarViewComponent />
            </Pressable>
          </View>
        </View>
      </GradiantProvider>
    );
  } else if (type === 4) {
    return (
      <GradiantProvider
        colors={['#6255FA', '#3B31B3']}
        style={styles.forthSection}>
        <View style={styles.type4Container}>
          <Pressable onPress={() => navigation.goBack()}>
            <LeftArrowIcon />
          </Pressable>
          <View style={styles.inner4Container}>
            <Text style={[{color: theme.white}, styles.headerTitleType1]}>
              {headerTitle}
            </Text>
            <Pressable style={{position: 'relative'}}>
              <AvatarViewComponent
                avatarContainer={styles.fourthAvatarContainer}
                imageStyle={styles.forthAvatarImage}
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.avatar4}>
                <EditIcon />
              </TouchableOpacity>
            </Pressable>
          </View>
          <View style={[styles.rightSection, {opacity: 0}]}></View>
        </View>
      </GradiantProvider>
    );
  }
};

export default HeaderView;

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: 'green',
    height: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitleType1: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 3,
  },

  //type2
  gradiantContainer: {
    height: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  type2Container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 18,
  },
  sbuHeading: {
    color: COLOR.white,
    fontSize: 14,
    marginTop: 3,
  },

  ///thirdSection
  thirdSection: {
    height: 100,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  type3Container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  //forth container
  forthSection: {
    height: 145,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  type4Container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    position: 'relative',
  },
  fourthAvatarContainer: {
    height: 90,
    width: 90,
    borderRadius: 90,
  },
  forthAvatarImage: {
    height: 90,
    width: 90,
    borderRadius: 90,
    resizeMode: 'cover',
  },
  inner4Container: {
    position: 'absolute',
    left: '42%',
    bottom: -45,
  },
  avatar4: {
    backgroundColor: COLOR.black,
    padding: 8,
    position: 'absolute',
    borderRadius: '50%',
    bottom: 0,
    right: 0,
  },
});
