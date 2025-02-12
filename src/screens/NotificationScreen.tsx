// NotificationScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import ContainerProvider from '../components/providers/ContainerProvider';
import { useAuthState } from '../context/AuthContext';
import AccordionItem from './AccordionItem'; // or wherever your AccordionItem is located
import API_INSTANCE from '../config/apiClient';

const NotificationScreen = () => {
  const { user } = useAuthState() ?? {};
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Put your notification fetch in a function:
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Replace with your real memberId if needed
      const response = await API_INSTANCE.get(`v1/notification/get-mem-msg/${user?.memberId}`)
      const json = await response.data;

      if (json.data) {
        // console.log(json.data);
        setNotifications(json.data);
        if(json.data.length ===0) 
            setError('No notifications found');
      } else {
        setError(json.message || 'No notifications found');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  // 2. Use useEffect to fetch on mount or when user?.memberId changes
  useEffect(() => {
    fetchNotifications();
  }, [user?.memberId]);

  // 3. A refresh callback for child to invoke after reply is submitted
  const handleReplySubmitted = () => {
    fetchNotifications(); // re-fetch the data
  };

  return (
    <ContainerProvider headerProps={{ type: 2, headerTitle: `Hello, ${user?.firstName}` }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainHeading}>Notifications</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          notifications.map((item) => (
            <AccordionItem
              key={item.notificationId}
              data={item}
              // 4. Pass your refresh callback down
              onReplySubmitted={handleReplySubmitted}
            />
          ))
        )}
      </ScrollView>
    </ContainerProvider>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});
