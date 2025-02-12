// import {Image, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import ContainerProvider from '../components/providers/ContainerProvider';
// import GradiantProvider from '../components/providers/GradiantProvider';
// import {COLOR} from '../utils/colors';
// import CustomButtonField from '../components/fields/CustomButtonField';
// import {theme} from '../utils/theme';
// import ImageSlider from '../components/view/ImageSliderView';
// import {
//   BooksIcon,
//   CalenderColorIcon,
//   ColorHomeIcon,
//   FlagIcon,
//   GroupIcon,
//   HeandHeartIcon,
//   LocationIcon,
// } from '../assets/svg';
// import BadgeView from '../components/view/BadgeView';
// import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
// import AvatarViewComponent from '../components/view/AvatarViewComponent';

// const HomeScreen = () => {
//   const _firstSection = () => {
//     return (
//       <>
//         <GradiantProvider
//           style={styles.firstSection}
//           colors={['#FFBD59', '#F6B2AF']}>
//           <View style={styles.innerContainer}>
//             <View style={styles.firstTextContainer}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'flex-start',
//                   columnGap: 35,
//                   alignItems: 'center',
//                   height: 20,
//                 }}>
//                 <Text style={[styles.firstText, {marginLeft: 5}]}>
//                   365 Days of{' '}
//                 </Text>
//                 <Image
//                   source={require('../assets/images/bananaLeaf.png')}
//                   style={{position: 'absolute', left: 83}}
//                 />{' '}
//                 <Text style={styles.firstText}>Food,</Text>
//               </View>

//               <Text style={styles.firstText}> 1 Day of Hope</Text>
//               <Text style={styles.firstSubText}>
//                 Pledge a day’s meal. Together, as a family, we can provide 365
//                 days of nourishment.
//               </Text>

//               <CustomButtonField
//                 buttonText="Sponsor Now"
//                 textColor={theme.white}
//                 style={styles.sponsorBtn}
//                 textStyle={styles.sponsorBtnText}
//                 onPress={() => {}}
//                 opacity={0.7}
//               />
//             </View>
//             <View style={styles.boyImage}>
//               <Image
//                 style={{width: 150, height: 150}}
//                 source={require('../assets/images/boy.png')}
//               />
//             </View>
//           </View>
//         </GradiantProvider>
//       </>
//     );
//   };

//   const _second_Section = () => {
//     return (
//       <View style={styles.secondContainer}>
//         <View style={{position: 'relative', width: 175}}>
//           <ImageSlider
//             imageContainerStyle={styles.imageContainer}
//             imageStyle={styles.imageStyle}
//           />
//           <View
//             style={[styles.btnSection, {flexDirection: 'row', columnGap: 16}]}>
//             <CustomButtonField
//               buttonText="Activities >"
//               onPress={() => {}}
//               style={[styles.ActivitiesBtn, {width: 100}]}
//               textColor={theme.white}
//               textStyle={styles.btnText}
//               opacity={0.8}
//             />
//             <CalenderColorIcon />
//           </View>
//           <Text
//             style={{
//               position: 'absolute',
//               color: '#fff',
//               bottom: 10,
//               marginHorizontal: 10,
//               fontSize: 13,
//               fontWeight: 500,
//               textAlign: 'left',
//               letterSpacing: 0.5,
//             }}>
//             Independence Day Celebration at Bright Future Home
//           </Text>
//         </View>
//         <View style={styles.secondRightSection}>
//           <View style={styles.btnSection}>
//             <CustomButtonField
//               buttonText="Sponsor >"
//               onPress={() => {}}
//               style={[styles.ActivitiesBtn, {width: 90}]}
//               textColor={theme.white}
//               textStyle={styles.btnText}
//               opacity={0.8}
//             />
//           </View>
//           <Text
//             style={{
//               position: 'relative',
//               top: '30%',
//               left: 8,
//               color: COLOR.black,
//               fontSize: 14,
//               fontWeight: 400,
//             }}>
//             Mr Kumaraswamy has contributed full day meals to Bright Future Home.
//           </Text>
//           <View style={{position: 'absolute', bottom: 10, left: 10}}>
//             <BadgeView
//               icon={<HeandHeartIcon />}
//               titleText={'A Big Thank You!'}
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: COLOR.white,
//                 borderRadius: 20,
//                 paddingHorizontal: 8,
//                 height: 40,
//               }}
//               textStyle={{color: COLOR.black, fontSize: 12, fontWeight: 500}}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const _thirdSection = () => {
//     return (
//       <View style={styles.thirdContainer}>
//         <View
//           style={{
//             backgroundColor: '#5DD2AE',
//             borderRadius: 20,
//             height: 300,
//             width: 176,
//             position: 'relative',
//           }}>
//           <View style={styles.btnSection}>
//             <CustomButtonField
//               buttonText="Home Details >"
//               onPress={() => {}}
//               style={[styles.ActivitiesBtn, {width: 120}]}
//               textColor={theme.white}
//               textStyle={styles.btnText}
//               opacity={0.8}
//             />
//           </View>
//           <View style={{position: 'absolute', top: '20%', left: 10}}>
//             <BadgeView
//               icon={<ColorHomeIcon />}
//               titleText={'Bright Future Home'}
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: COLOR.white,
//                 borderRadius: 20,
//                 paddingHorizontal: 10,
//                 height: 40,
//               }}
//               textStyle={{color: COLOR.black, fontSize: 12, fontWeight: 500}}
//             />
//           </View>
//           <View
//             style={{
//               position: 'relative',
//               top: '38%',
//               left: 10,
//               width: '90%',
//               rowGap: 4,
//             }}>
//             <View style={{flexDirection: 'row', columnGap: 3}}>
//               <LocationIcon />
//               <Text style={{color: COLOR.black}}>Ashok Nagar,Chennai</Text>
//             </View>

//             <View style={{flexDirection: 'row', columnGap: 3}}>
//               <GroupIcon />
//               <Text style={{color: COLOR.black}}>Supported: 38</Text>
//             </View>

//             <View style={{flexDirection: 'row', columnGap: 3}}>
//               <FlagIcon />
//               <Text
//                 style={{
//                   textAlign: 'justify',
//                   lineHeight: 16,
//                   color: COLOR.black,
//                 }}>
//                 <Text
//                   style={{fontSize: 14, fontWeight: 700, color: COLOR.black}}>
//                   Mission:
//                 </Text>{' '}
//                 To ensure all children have the opportunity to grow, learn, and
//                 dream big
//               </Text>
//             </View>

//             <CustomButtonField
//               buttonText="More Details"
//               onPress={() => {}}
//               opacity={0.8}
//               style={{
//                 height: 35,
//                 borderRadius: 20,
//                 backgroundColor: COLOR.black,
//                 justifyContent: 'center',
//                 width: 110,
//                 marginLeft: 'auto',
//                 marginTop: 16,
//               }}
//               textColor={theme.white}
//             />
//           </View>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             height: 300,
//             alignItems: 'flex-end',
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               backgroundColor: '#F4C4F3',
//               height: 175,
//               width: 175,
//               borderRadius: 20,
//               position: 'relative',
//             }}>
//             <View style={styles.btnSection}>
//               <CustomButtonField
//                 buttonText="Needs >"
//                 onPress={() => {}}
//                 style={[styles.ActivitiesBtn, {width: 80}]}
//                 textColor={theme.white}
//                 textStyle={styles.btnText}
//                 opacity={0.8}
//               />
//             </View>
//             <Text
//               style={{
//                 position: 'absolute',
//                 top: '35%',
//                 width: 150,
//                 left: 17,
//                 fontSize: 14,
//                 fontWeight: 400,
//               }}>
//               The list of requirements for Bright Future Home:
//             </Text>
//             <View style={{position: 'absolute', bottom: 10, left: 10}}>
//               <BadgeView
//                 icon={<BooksIcon />}
//                 titleText={' 8th and 10th\n Standard Books'}
//                 style={{
//                   flexDirection: 'row',
//                   justidyContent: 'center',
//                   alignItems: 'flex-start',
//                   backgroundColor: COLOR.white,
//                   borderRadius: 20,
//                   paddingHorizontal: 8,
//                   height: 50,
//                   position: 'relative',
//                   width: 150,
//                 }}
//                 textStyle={{
//                   color: COLOR.black,
//                   fontSize: 12,
//                   alignSelf: 'center',
//                   textAlign: 'left',
//                   fontWeight: 500,
//                   position: 'absolute',
//                   right: 6,
//                 }}
//               />
//             </View>
//           </View>
//           <View
//             style={{
//               backgroundColor: '#FFD194',
//               height: 110,
//               width: 175,
//               borderRadius: 20,
//               position: 'relative',
//             }}>
//             <View style={styles.btnSection}>
//               <CustomButtonField
//                 buttonText="Gallery >"
//                 onPress={() => {}}
//                 style={[styles.ActivitiesBtn, {width: 80}]}
//                 textColor={theme.white}
//                 textStyle={styles.btnText}
//                 opacity={0.8}
//               />
//             </View>
//             <View style={{flex: 1, position: 'relative', top: 60, left: 10}}>
//               <View style={{position: 'absolute'}}>
//                 <AvatarViewComponent imageData="https://sfrbucket.s3.ap-south-1.amazonaws.com/Kunal.jpeg" />
//               </View>
//               <View style={{position: 'absolute', left: 20}}>
//                 <AvatarViewComponent imageData="https://sfrbucket.s3.ap-south-1.amazonaws.com/Kunal.jpeg" />
//               </View>
//               <View style={{position: 'absolute', left: 40}}>
//                 <AvatarViewComponent imageData="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" />
//               </View>
//               <View style={{position: 'absolute', right: 25, top: 10}}>
//                 <Text style={{fontSize: 14, fontWeight: 500}}>+24 Img</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <ContainerProvider headerProps={{type: 2, headerTitle: 'Hello,Karthikeya'}}>
//       <KeyboardAvoidingProvider>
//         <View style={styles.innerMainContainer}>
//           {_firstSection()}
//           {_second_Section()}
//           {_thirdSection()}
//         </View>
//       </KeyboardAvoidingProvider>
//     </ContainerProvider>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   innerMainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   ///first section
//   firstSection: {
//     flex: 1,
//     height: 160,
//     width: '93%',
//     marginVertical: 16,
//     borderRadius: 20,
//     position: 'relative',
//   },
//   innerContainer: {
//     width: '100%',
//     height: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   boyImage: {alignSelf: 'flex-end'},
//   firstTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//     marginTop: 12,
//     position: 'relative',
//   },
//   headerText: {
//     fontSize: 14,
//     left: 13,
//     top: 15,
//     fontWeight: 700,
//     color: COLOR.white,
//   },
//   firstButton: {
//     top: 23,
//     left: 13,
//     height: 30,
//     backgroundColor: COLOR.white,
//     borderRadius: 50,
//     justifyContent: 'center',
//     width: '80%',
//   },
//   firstRatingContainer: {
//     top: 30,
//     left: 18,
//     flexDirection: 'row',
//     width: '60%',
//     justifyContent: 'space-between',
//   },
//   firstText: {
//     color: COLOR.black,
//     fontWeight: 700,
//     fontSize: 16,
//   },
//   firstSubText: {
//     position: 'relative',
//     marginLeft: 9,
//     fontSize: 13,
//     fontWeight: 400,
//     marginVertical: 10,
//     lineHeight: 18,
//     top: -6,
//   },
//   sponsorBtn: {
//     width: 110,
//     height: 30,
//     backgroundColor: COLOR.black,
//     borderRadius: 30,
//     justifyContent: 'center',
//     position: 'relative',
//     bottom: 8,
//     left: 8,
//   },
//   sponsorBtnText: {
//     fontSize: 14,
//     fontWeight: 600,
//   },

//   //second section
//   secondContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     columnGap: 13,
//   },
//   secondRightSection: {
//     width: 175,
//     height: 185,
//     backgroundColor: '#72C6EF',
//     borderRadius: 20,
//     padding: 10,
//     position: 'relative',
//   },

//   ///imageSlider
//   imageContainer: {
//     flex: 1,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//   },
//   imageStyle: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     borderRadius: 20,
//   },

//   //third section
//   thirdContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginHorizontal: 16,
//     marginTop: 16,
//   },

//   //active btn
//   ActivitiesBtn: {
//     backgroundColor: 'backgroundColor: "rgba(0, 0, 0, 0.3)"',
//     height: 35,
//     justifyContent: 'center',
//     borderRadius: 20,
//     position: 'relative',
//     alignItems: 'center',
//   },
//   btnText: {
//     fontSize: 14,
//     fontWeight: 700,
//     color: '#FFFFFF',
//     position: 'absolute',
//     opacity: 2,
//   },
//   //btn section
//   btnSection: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//   },
// });
