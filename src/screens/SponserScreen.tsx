import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import ContainerProvider from '../components/providers/ContainerProvider';
import CustomButtonField from '../components/fields/CustomButtonField';
import HeaderView from '../components/view/HeaderView';
import GradiantProvider from '../components/providers/GradiantProvider';
import { meals } from '../entities/mockdata';
import { theme } from '../utils/theme';
import {
  AddMemberIcon,
  ChildrenHomeIcon,
  ClockIcon,
  FoodIcon,
  UserIcon,
} from '../assets/svg';
import { useAuthState } from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';

const width = Dimensions.get('window').width;

const SponserScreen = () => {
      const {user} = useAuthState() ?? {};
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [sponsors, setSponsors] = useState([]); // To store API response
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch sponsor data from API
  const fetchSponsors = async () => {
    try {
      const response = await API_INSTANCE.get(`v1/family-member/fetch-all-bookings-orphanage?orphangeId=${user?.orphanageId}`
      );
      const result = await response.data;

      if (result.data) {
        console.log('sponsor', result?.data)
        setSponsors(result.data);
      } else {
        throw new Error('Failed to fetch sponsor data');
      }
    } catch (err) {
      console.error(err);
      setError('No sponsor data available for today');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Generate all dates for the next 6 months
  // const generateDates = () => {
  //   const dates = [];
  //   const currentDate = new Date();

  //   for (let i = 0; i < 60 * 30; i++) {
  //     const date = new Date(currentDate);
  //     date.setDate(currentDate.getDate() + i);
  //     dates.push(date);
  //   }

  //   return dates;
  // };

  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    for (let i = 0; i < 365; i++) {  // Max 365 days for safety
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
  
      // Stop adding dates if we reach next year
      if (date.getFullYear() > currentYear) {
        break;
      }
  
      dates.push(date);
    }
  
    return dates;
  };
  

  const dates = generateDates();

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const _meal_section = () => {
    return (
      <GradiantProvider
        style={styles.fourthSection}
        colors={['#B7D4FF', '#B7D4FF']}
      >
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{meal?.title}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.time}>{meal?.time}</Text>
              <View style={styles.dottedLine} />
              {meal.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </GradiantProvider>
    );
  };

  const MealScheduleScreen = () => {
    return (
      <View style={styles.container}>
        {/* Dynamic Month Display */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{getMonthName(selectedDate)}</Text>
        </View>

        {/* Horizontal Date Picker */}
        <View style={styles.horizontalPicker}>
          <FlatList
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toDateString()}
            renderItem={({ item }) => {
              const isSelected = item.toDateString() === selectedDate.toDateString();
              return (
                <Pressable
                  onPress={() => setSelectedDate(item)}
                  style={[
                    styles.dateItem,
                    isSelected && styles.activeDateItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      isSelected && styles.activeText,
                    ]}
                  >
                    {item.getDate()}
                  </Text>
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.activeText,
                    ]}
                  >
                    {item.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        <View>
  {loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : error ? (
    <Text style={styles.errorText}>{error}</Text>
  ) : (
    <>
      {/* Filtered Sponsors List */}
      {sponsors.filter((sponsor) => sponsor.bookingDate === selectedDate.toISOString().split('T')[0]).length > 0 ? (
        sponsors
          .filter((sponsor) => sponsor.bookingDate === selectedDate.toISOString().split('T')[0])
          .map((sponsor, i) => (
            <View
              key={i}
              style={{
                marginBottom: 10,
                backgroundColor: 'rgba(240, 240, 240, 0.95)',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
                overflow: 'hidden',
              }}
            >
              <CustomButtonField
                buttonText={`Today Sponsor's`}
                onPress={() => {}}
                style={{
                  height: 30,
                  backgroundColor: 'rgba(59, 67, 111, 0.1)',
                  justifyContent: 'center',
                  borderRadius: 15,
                  margin: 10,
                  shadowRadius: 8,
                }}
                textColor={theme.fontFamily}
                opacity={1}
              />

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                {/* Sponsor Info */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(150, 209, 203, 0.8)',
                    borderRadius: 15,
                    marginRight: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: 'rgba(150, 209, 203, 0.8)',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowRadius: 20,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: theme.white }}>👤</Text>
                    </View>
                    <Text style={{ color: theme.black, marginLeft: 10, fontSize: 14 }}>
                      {sponsor.memberNameBooked}
                    </Text>
                  </View>

                  {/* Booking Date */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, marginRight: 6 }}>📅</Text>
                    <Text style={{ color: theme.black, fontSize: 12 }}>
                      {sponsor.bookingDate}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(213, 99, 217, 0.2)',
                    borderRadius: 10,
                    padding: 8,
                    marginLeft: 8,
                  }}
                >
                  <ScrollView
                    style={{ maxHeight: 60 }}
                    contentContainerStyle={{ paddingBottom: 5 }}
                    nestedScrollEnabled={true}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'rgba(0, 0, 0, 0.8)',
                        lineHeight: 18,
                      }}
                    >
                      {sponsor.memberNameBookedDescription || "It's my birthday, I'm ordering"}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          ))
      ) : (
        <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 14, color: theme.black }}>
          No sponsors found for this date.
        </Text>
      )}

      {/* Impact Story Section (Always Displayed) */}
      <View style={[styles.card, { backgroundColor: '#F2BD7F', marginTop: 6 }]}>
        <CustomButtonField
          buttonText={`Impact Story`}
          onPress={() => {}}
          style={{
            height: 30,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            borderRadius: 30,
            width: 110,
            marginLeft: -6,
            marginBottom: 8,
          }}
          textColor={theme.white}
          opacity={1}
        />
        <View
          style={{
            backgroundColor: theme.white,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            height: 100,
            position: 'relative',
          }}
        >
          <Image
            source={require('../assets/images/script.png')}
            style={{ width: 80, height: 80 }}
          />
          <Text style={styles.quoteText}>
            "I love the sweets we got today.{'\n'}
            Thank you for making today special!"
          </Text>
          <Text style={{ position: 'absolute', right: 15, bottom: 12 }}>
            - Ayesha
          </Text>
        </View>
      </View>
    </>
  )}
</View>

<View>
    <>
              <CustomButtonField
            buttonText={`List of Sponsor's`}
            onPress={() => {}}
            style={{
              height: 30,
              backgroundColor: 'rgba(59, 67, 111, 0.1)',
              justifyContent: 'center',
              borderRadius: 15,
              margin: 10,
              shadowRadius: 8,
            }}
            textColor={theme.dark}
            opacity={1}
          />
      {/* Sponsors List */}
      {sponsors.map((sponsor, i) => (
        <View
          key={i}
          style={{
            marginBottom: 10,
            backgroundColor: 'rgba(240, 240, 240, 0.95)',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
            overflow: 'hidden',
          }}
        >

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            {/* Sponsor Info */}
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(150, 209, 203, 0.8)',
                borderRadius: 15,
                marginRight: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: 'rgba(150, 209, 203, 0.8)',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowRadius: 20,
                  }}
                >
                  <Text style={{ fontSize: 14, color: theme.white }}>👤</Text>
                </View>
                <Text style={{ color: theme.black, marginLeft: 10, fontSize: 14 }}>
                  {sponsor.memberNameBooked}
                </Text>
              </View>

              {/* Booking Date */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 6 }}>📅</Text>
                <Text style={{ color: theme.black, fontSize: 12 }}>
                  {sponsor.bookingDate}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(213, 99, 217, 0.2)',
                borderRadius: 10,
                padding: 8,
                marginLeft: 8,
              }}
            >
              <ScrollView
                style={{ maxHeight: 60 }}
                contentContainerStyle={{ paddingBottom: 5 }}
                nestedScrollEnabled={true}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: 'rgba(0, 0, 0, 0.8)',
                    lineHeight: 18,
                  }}
                >
                  {sponsor.memberNameBookedDescription || "It's my birthday, I'm ordering"}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      ))}
    </>
</View>


        {/* {_meal_section()} */}
      </View>
    );
  };

  return (
    <ContainerProvider>
      <HeaderView type={3} headerTitle="Sponsors" />
      <ScrollView style={{ width: width }}>{MealScheduleScreen()}</ScrollView>
    </ContainerProvider>
  );
};

export default SponserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  monthContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.black,
  },
  horizontalPicker: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  activeDateItem: {
    backgroundColor: theme.black,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.black,
  },
  dayText: {
    fontSize: 12,
    color: theme.black,
  },
  activeText: {
    color: theme.white,
  },
  fourthSection: {
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: '#f8ebfb',
    padding: 10,
    flexDirection: 'row',
    flex: 1,
  },
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
  dottedLine: {
    width: 70,
    height: 1,
    borderTopColor: '#717171',
    borderTopWidth: 1,
    borderStyle: 'dotted',
    marginVertical: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
