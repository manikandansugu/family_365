// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import CustomTabBar from '../components/view/CustomeTabBarView';
// import ProfileScreen from '../screens/ProfileScreen';
// import ActivityScreen from '../screens/ActivityScreen';
// import SponserScreen from '../screens/SponserScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{headerShown: false}}
//       tabBar={(props: any) => <CustomTabBar {...props} />}>
//       <Tab.Screen
//         name="Home"
//         options={{tabBarLabel: 'Home'}}
//         component={HomeScreen}
//       />
//       <Tab.Screen
//         name="Sponsors"
//         options={{tabBarLabel: 'Sponsors'}}
//         component={SponserScreen}
//       />
//       <Tab.Screen
//         name="activity"
//         options={{tabBarLabel: 'Activity'}}
//         component={ActivityScreen}
//       />
//       <Tab.Screen
//         name="profile"
//         options={{tabBarLabel: 'Profile'}}
//         component={ProfileScreen}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CustomTabBar from '../components/view/CustomeTabBarView';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import SponserScreen from '../screens/SponserScreen';
import { TabBarVisibilityContext } from '../context/TabBarVisibilityContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isTabBarVisible } = useContext(TabBarVisibilityContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props: any) => (isTabBarVisible ? <CustomTabBar {...props} /> : null)}>
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: 'Home' }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Sponsors"
        options={{ tabBarLabel: 'Sponsors' }}
        component={SponserScreen}
      />
      <Tab.Screen
        name="activity"
        options={{ tabBarLabel: 'Activity' }}
        component={ActivityScreen}
      />
      <Tab.Screen
        name="profile"
        options={{ tabBarLabel: 'Profile' }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
