import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClockIcon,
  GroupIcon,
  LocationIcon,
  LockIcon,
  LockIconInActive,
} from '../assets/svg';
import ContainerProvider from '../components/providers/ContainerProvider';
import GradiantProvider from '../components/providers/GradiantProvider';
import MealProviderModal from '../components/view/MealProvideSliderModalView';
import TopInfoBar from '../components/view/TopInfoBar';
import { OrphanageData, OrphanageResponse } from '../entities/commonObjects';
import { tabMenuItems } from '../entities/entryObjects';
import { memberData } from '../redux/slices/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { COLOR } from '../utils/colors';
import { LayoutAnimations, validateBookings } from '../utils/helpers';
import API_INSTANCE from '../config/apiClient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let clearTime: any;
const OrphanageDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [loadingLogo, setLoadingLogo] = useState<boolean>(true);
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );
  console.log(OrphanageDetails)
  const [selectedTabMenu, setSelectedTabMenu] = useState<any>(
    tabMenuItems?.at(0)?.text,
  );
  const fetchOrphanageLogo = async (orphanageId: string) => {
    try {
      setLoadingLogo(true);
      const response = await API_INSTANCE.get(`v1/storage/fetch-logo-for-orphanage`,
        {
          params: { orphanageId },
          responseType: 'arraybuffer', // Ensure binary data is fetched
        }
      );

      // Convert binary data to Base64
      const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString(
        'base64'
      )}`;
      setLogoUri(base64Image);
    } catch (error) {
      console.error('Error fetching orphanage logo:', error);
      setLogoUri(null); // Handle errors gracefully
    } finally {
      setLoadingLogo(false);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfMember, setNumberOfMember] = useState<any>();
  const [totalAmount, setTotalAmount] = useState<any>();
  const [isTextExpand, setIsTextExpand] = useState<boolean>(false);
  const [localInput, setLocalInput] = useState<any[]>([
    {
      memberId: '',
      totalPaymentMade: '',
      bookingDate: moment(Date.now()).format('DD/MMM/YYYY'),
      memberNameBooked: '',
      memberNameBookedProof: '',
      memberNameBookedDob: '',
      memberBookedDescription: '',
      isVisible: false,
    },
  ]);
  const handleTabSelect = (tabText: string) => {
    setSelectedTabMenu(tabText);
  };
  const onSwipe = () => {
    const validatedBookings = validateBookings(localInput);
    setLocalInput(validatedBookings);
    const error = validatedBookings.some(
      (itm: any) => itm.isDescriptionError || itm.isDobError,
    );
    if (error) {
      return;
    } else {
      dispatch(memberData(localInput));
      setModalVisible(false);
      navigation.navigate('register');
    }
  };
  useEffect(() => {
    fetchOrphanageLogo(OrphanageDetails[0]?.data?.orphanageId); 
    clearTime = setTimeout(() => {
      setModalVisible(true);
    }, 5000);
  }, []);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       dispatch(resetState());
  //       navigation.goBack();
  //       return true;
  //     },
  //   );

  //   // Cleanup the event listener when the component is unmounted
  //   return () => backHandler.remove();
  // }, []);

  const _fist_section = (orphanage: OrphanageData) => {
    return (
      <GradiantProvider
        style={styles.firstSection}
        colors={['#B7D4FF', '#72C6EF']}>
        <View style={styles.section1Container}>
          {/* Image Section */}
          {loadingLogo ? (
            <ActivityIndicator size="small" color={COLOR.seaGreen} />
          ) : (
            <Image
              source={
                logoUri
                  ? { uri: logoUri }
                  : require('../assets/images/section1.png')
              }
              style={styles.section1Image}
            />
          )}
          {/* Text Section */}
          <View style={{marginLeft: 3, flex: 1}}>
            {/* Title */}
            <Text style={styles.titleText}>{orphanage?.name}</Text>
            {/* Strength Row */}
            <View style={styles.rowContainer}>
              <GroupIcon />
              <Text style={styles.rowText}>
                Strength:{' '}
                <Text style={styles.subText}>{orphanage?.strength}</Text>
              </Text>
            </View>
            {/* Address Row */}
            <View style={styles.rowContainer}>
              <LocationIcon />
              <Text style={styles.rowText}>
                Address:{' '}
                <Text style={[styles.subText, {fontSize: 14, lineHeight: 16}]}>
                  {[
                    orphanage?.addressLine1,
                    orphanage?.addressLine2,
                    orphanage?.addressLine3,
                    orphanage?.city,
                    orphanage?.state,
                    orphanage?.pincode,
                  ]
                    .filter(Boolean)
                    .join(', ')}{' '}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </GradiantProvider>
    );
  };

  const _second_section = () => {
    return (
      <GradiantProvider
        style={styles.secondSection}
        colors={['#FFD194', '#FFB75E']}>
        <View style={{flex: 1}}>
          <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
              <View style={styles.textSection}>
                <Text style={styles.textHeader}>Fill a Plate</Text>
                <Image
                  source={require('../assets/images/bananaLeaf.png')}
                  style={{width: 48, height: 25}}
                />
                <Text style={styles.textHeader}>Fill a Heart</Text>
                <Image
                  source={require('../assets/images/heart.png')}
                  style={{width: 20, height: 23, marginLeft: 4}}
                />
              </View>

              <Text style={styles.subHeading}>
              Sponsor a meal and make a real impact on their life…
              </Text>
            </View>

            <TouchableOpacity
              style={styles.contributeButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.contributeButtonText}>Contribute</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradiantProvider>
    );
  };

  const _third_section = (orphanage: OrphanageData) => {
    return (
      <GradiantProvider
        style={styles.thirdSection}
        colors={['#96D1CB', '#5DD2AE']}>
        <View style={styles.thirdMainContainer}>
          <View>
            <TouchableOpacity style={styles.aboutBtn}>
              <Text style={styles.aboutBtnText}>About</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.thirdTextContainer,
              {maxHeight: isTextExpand ? 'auto' : 80},
            ]}>
            <Text style={styles.contentText}>
              <Text style={styles.thirdTextHeader}>{orphanage?.name} :</Text>
              {orphanage?.mission}
            </Text>
            {/* <Text style={styles.contentText}>
              {' '}
              Founded with a focus on developing individual talents, this home
              serves 70 children, providing educational resources, personal
              care, and career-oriented training.
            </Text> */}
          </View>
          <Pressable
            style={{
              marginVertical: 16,
              backgroundColor: 'rgba(0,0,0,0.2)',
              width: 110,
              height: 30,
              borderRadius: 16,
              marginLeft: 'auto',
              justifyContent: 'center',
            }}
            onPress={() => {
              LayoutAnimations.easeIn();
              setTimeout(() => setIsTextExpand(!isTextExpand), 0);
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 12, color: COLOR.white}}>
              {isTextExpand ? 'Read Less..' : 'Read More...'}
            </Text>
          </Pressable>
        </View>
      </GradiantProvider>
    );
  };

  const _tab_section = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabMenuItems.map((tabItem: any, index: number) => {
          return (
            <Pressable
              key={index}
              style={[
                tabItem?.text === selectedTabMenu
                  ? styles.tabActive
                  : styles.tabInActive,
              ]}
              onPress={() =>
                !tabItem?.isLock && handleTabSelect(tabItem?.text)
              }>
              <Text
                style={[
                  tabItem?.text === selectedTabMenu
                    ? styles.textActive
                    : styles.textInactive,
                ]}>
                {tabItem.text}
              </Text>
              {tabItem.isLock ? (
                tabItem?.text === selectedTabMenu ? (
                  <LockIconInActive />
                ) : (
                  <LockIcon />
                )
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    );
  };

  // const _fourth_section = (orphanage: OrphanageData) => {
  //   const meals = JSON.parse(orphanage.mealMenu);
  //   const certificateList = JSON.parse(orphanage.certificateList);
  //   const mealTitles: Record<keyof typeof meals, string> = {
  //     breakfast: 'Breakfast',
  //     lunch: 'Lunch',
  //     dinner: 'Dinner',
  //   };
  
  //   return (
  //     <GradiantProvider
  //       style={styles.fourthSection}
  //       colors={['#F4C4F3', '#FDB2FF']}
  //     >
  //       {selectedTabMenu === 'Certificate List' ? (
  //        <View style={styles.mealContainer1}>
  //        <Text style={styles.title1}>Certificate List</Text>
  //        {certificateList.map((certificate: any, index: number) => (
  //          <View key={index} style={styles.titleContainer1}>
  //            <Text style={styles.certificateText}>
  //              Certificate Name: {certificate.certificateName}
  //            </Text>
  //            <Text style={styles.certificateText}>
  //              Issued by: {certificate.issueBy} on {certificate.issueData}
  //            </Text>
  //            <Text style={styles.certificateText}>
  //              Expires by: {certificate.expDate}
  //            </Text>
  //          </View>
  //        ))}
  //      </View>
  //       ) : (
  //         Object.keys(meals).map((mealKey, index) => {
  //           const key = mealKey as keyof typeof meals;
  //           return (
  //             <View key={index} style={styles.mealContainer}>
  //               <View style={styles.titleContainer}>
  //                 <ClockIcon />
  //                 <Text style={styles.title}>{mealTitles[key]}</Text>
  //               </View>
  //               <View style={styles.list}>
  //                 <View style={styles?.dotedLined} />
  //                 {meals[key].map((item: any, idx: React.Key | null | undefined) => (
  //                   <Text key={idx} style={styles?.item}>
  //                     • {item}
  //                   </Text>
  //                 ))}
  //               </View>
  //             </View>
  //           );
  //         })
  //       )}
  //     </GradiantProvider>
  //   );
  // };
  
  const _fourth_section = (orphanage: OrphanageData) => {
    const meals = JSON.parse(orphanage.mealMenu); // New data structure
    console.log(`meals`, meals)
    const certificateList = JSON.parse(orphanage.certificateList);
  // const meals = {
  //   "monday": {
  //     "breakfast": [
  //       "Pancakes",
  //       "Scrambled Eggs",
  //       "Orange Juice"
  //     ],
  //     "lunch": [
  //       "Grilled Chicken Salad",
  //       "Garlic Bread",
  //       "Lemonade"
  //     ],
  //     "dinner": [
  //       "Spaghetti Bolognese",
  //       "Caesar Salad",
  //       "Brownie with Ice Cream"
  //     ]
  //   },
  //   "tuesday": {
  //     "breakfast": [
  //       "Oatmeal with Fruits",
  //       "Boiled Eggs",
  //       "Milkshake"
  //     ],
  //     "lunch": [
  //       "Vegetable Stir Fry",
  //       "Fried Rice",
  //       "Mint Cooler"
  //     ],
  //     "dinner": [
  //       "Roasted Salmon",
  //       "Mashed Potatoes",
  //       "Steamed Broccoli"
  //     ]
  //   },
  //   "wednesday": {
  //     "breakfast": [
  //       "French Toast",
  //       "Sausages",
  //       "Coffee"
  //     ],
  //     "lunch": [
  //       "Chicken Curry",
  //       "Rice",
  //       "Roti",
  //       "Mango Lassi"
  //     ],
  //     "dinner": [
  //       "Grilled Steak",
  //       "Baked Sweet Potatoes",
  //       "Green Salad"
  //     ]
  //   },
  //   "thursday": {
  //     "breakfast": [
  //       "Smoothie Bowl",
  //       "Granola Bars",
  //       "Herbal Tea"
  //     ],
  //     "lunch": [
  //       "Vegetable Pasta",
  //       "Breadsticks",
  //       "Iced Tea"
  //     ],
  //     "dinner": [
  //       "Roasted Chicken",
  //       "Quinoa Salad",
  //       "Fruit Tart"
  //     ]
  //   },
  //   "friday": {
  //     "breakfast": [
  //       "Bagels with Cream Cheese",
  //       "Fruit Salad",
  //       "Green Tea"
  //     ],
  //     "lunch": [
  //       "Fish Tacos",
  //       "Corn Salad",
  //       "Lime Soda"
  //     ],
  //     "dinner": [
  //       "Butter Chicken",
  //       "Naan Bread",
  //       "Gulab Jamun"
  //     ]
  //   }
  // }
  
    return (
      <GradiantProvider
        style={styles.fourthSection}
        colors={['#F4C4F3', '#FDB2FF']}
      >
        {selectedTabMenu === 'Certificate List' ? (
          <View style={styles.mealContainer1}>
            {certificateList.map((certificate: any, index: number) => (
              <View key={index} style={styles.titleContainer1}>
                      {/* <Text style={styles.title1}>Certificate List</Text> */}
                <Text style={styles.certificateText}>
                 {certificate.certificateName}
                </Text>
                <Text style={styles.certificateText}>
                  Issued date: {certificate.issueData}
                </Text>
                <Text style={styles.certificateText}>
                  Issued by: {certificate.issueBy} on {certificate.issueData}
                </Text>
                <Text style={styles.certificateText}>
                  Expiry date: {certificate.expDate}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object?.keys(meals)?.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                {/* Day Title */}
                <Text style={styles?.dayTitle}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Text>
                {/* Render meals for each time (breakfast, lunch, dinner) */}
                {Object?.keys(meals?.[day])?.map((mealType, idx) => (
                  <View key={idx} style={styles.mealContainer}>
                    <View style={styles.titleContainer}>
                      <ClockIcon />
                      <Text style={styles.title}>
                        {mealType?.charAt(0).toUpperCase() + mealType?.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.list}>
                      <View style={styles.dotedLined} />
                      {meals?.[day]?.[mealType]?.map((item: string, itemIdx: number) => (
                        <Text key={itemIdx} style={styles.item}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        )}
      </GradiantProvider>
    );
  };
  
  

  return (
    <>
      <ContainerProvider>
        <TopInfoBar type={1} headerTitle="Orphanage Details" />
        <ScrollView bounces={false}>
          {OrphanageDetails?.map(
            (orphanage: OrphanageResponse, index: number) => {
              return (
                <View style={[styles.bodyContainer]} key={index}>
                  {_fist_section(orphanage?.data)}
                  {_second_section()}
                  {_third_section(orphanage.data)}
                  {_tab_section()}
                  {_fourth_section(orphanage.data)}
                </View>
              );
            },
          )}
        </ScrollView>
        <MealProviderModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          clearTime={clearTime}
          data={OrphanageDetails}
          setNumberOfMember={setNumberOfMember}
          setTotalAmount={setTotalAmount}
          onSwipe={onSwipe}
          localInput={localInput}
          setLocalInput={setLocalInput}
        />
      </ContainerProvider>
    </>
  );
};

export default OrphanageDetailsScreen;

const styles = StyleSheet.create({
  bodyContainer: {
    marginHorizontal: 16,
  },
  //   firstSection: {
  //     height: 120,
  //     marginVertical: 15,
  //     borderRadius: 20,
  //   },
  secondSection: {
    flex: 1,
    height: 80,
    marginTop: 15,
    borderRadius: 20,
  },
  thirdSection: {
    height: 'auto',
    marginVertical: 15,
    borderRadius: 20,
  },
  fourthSection: {
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#f8ebfb',
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },
  tabActive: {
    marginHorizontal: 10,
    backgroundColor: COLOR.black,
    borderColor: COLOR.black,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
  },
  tabInActive: {
    marginHorizontal: 10,
    borderColor: COLOR.black,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
  },
  textActive: {
    color: COLOR.white,
  },
  textInactive: {
    color: COLOR.black,
  },
  lockActive: {
    color: COLOR.white,
  },
  LockInactive: {
    color: COLOR.black,
  },
  /////section1
  firstSection: {
    borderRadius: 10,
    width: '100%',
    padding: 10,
    marginTop: 15,
  },
  section1Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section1Image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLOR.darkGray,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  rowText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    color: COLOR.darkGray,
    fontWeight: 700,
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.darkGray,
  },

  ///section2
  innerContainer: {
    padding: 13,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textSection: {flexDirection: 'row', width: 100},
  textHeader: {
    fontSize: 16,
    fontWeight: 700,
    color: COLOR.darkGoldenBrown,
  },
  subHeading: {
    fontSize: 14,
    color: COLOR.darkGoldenBrown,
    width: '90%',
    lineHeight: 18,
  },
  contributeButton: {
    height: 40,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginLeft: 'auto',
  },
  textContainer: {width: '70%'},
  contributeButtonText: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.darkGoldenBrown,
  },

  ////third section
  thirdMainContainer: {
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  aboutBtn: {
    height: 40,
    backgroundColor: COLOR.seaGreen,
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 'auto',
  },
  aboutBtnText: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
  },
  thirdTextContainer: {
    backgroundColor: COLOR.white,
    height: 'auto',
    marginTop: 12,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  thirdTextHeader: {
    fontSize: 15,
    fontWeight: 600,
  },
  contentText: {
    fontSize: 14,
    color: COLOR.black,
    lineHeight: 20,
    textAlign: 'left',
  },

  //fourth section
  mealContainer: {
    borderRadius: 10,
    flexGrow: 1,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 1,
    textAlignVertical: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
    marginHorizontal: 'auto',
  },
  list: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    minHeight: 220,
    borderRadius: 15,
  },
  item: {
    fontSize: 14,
    marginVertical: 2,
  },
  dotedLined: {
    width: 70,
    height: 1,
    borderTopColor: '#717171',
    borderTopWidth: 1,
    borderStyle: 'dotted',
    marginHorizontal: 'auto',
    marginVertical: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
    mealContainer1: {
      width: '100%', // Take full width of the screen
      padding: 16, // Add consistent padding
      backgroundColor: '#fff', // White background for the container
      borderRadius: 10, // Rounded corners
      shadowColor: '#000', // Shadow for elevation
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3, // Shadow for Android
      marginBottom: 16, // Add spacing between containers
    },
    title1: {
      fontSize: 16, // Responsive font size for headings
      fontWeight: 'bold', // Make it stand out
      color: '#333', // Neutral text color
      marginBottom: 8, // Space after title
    },
    titleContainer1: {
      marginVertical: 8, // Spacing between each certificate item
      padding: 8, // Padding inside each certificate container
      borderBottomWidth: 1, // Add a bottom border
      borderBottomColor: '#ccc', // Light gray color for the border
    },
    certificateText: {
      fontSize: 16, // Font size for details
      color: '#555', // Slightly lighter color for details
      lineHeight: 24, // Line height for better readability
    },
    dayContainer: {
      marginRight: 15, // Add spacing between days
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      width: 250, // Set a fixed width for each day's container
    },
    dayTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
      textAlign: 'center',
    },
    mealContainerM: {
      marginBottom: 15,
    },
    titleContainerM: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
    },
    list: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
    },
    dotedLined: {
      height: 1,
      borderStyle: 'dotted',
      borderColor: '#ccc',
      borderWidth: 1,
      marginVertical: 5,
    },
    item: {
      fontSize: 14,
      marginVertical: 2,
    },
});
