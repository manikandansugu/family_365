import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import ContainerProvider from '../components/providers/ContainerProvider';
import { useAuthState } from '../context/AuthContext';
import {
  CalenderColorIcon,
  ErrorIcon,
  FlagIcon,
  SuccessIcon,
} from '../assets/svg';
import CustomButtonField from '../components/fields/CustomButtonField';
import API_INSTANCE from '../config/apiClient';

const NeedsScreen = () => {
  const { user } = useAuthState() ?? {};
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNeedsData = async () => {
    try {
      console.log(user?.orphanageId)
      const response = await API_INSTANCE.post(`/v1/orphanage/fetch-needs?id=${user?.orphanageId}`);
      const json = await response.data;
console.log(json.data)
      if (!json.data) {
        throw new Error(json.message || 'Failed to fetch needs');
      }

      setNeeds(json.data);
    } catch (err) {
      console.error('Error fetching needs:', err?.response);
      setError('No needs available, Please check later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeedsData();
  }, []);

  const renderNeeds = () => {
    if (needs.length === 0) {
      return (
        <Text style={styles.infoText}>No needs found for this orphanage.</Text>
      );
    }

    return needs.map((item, index) => (
      <View style={styles.card} key={index}>
        {/* Top Section: Need & Approval */}
        <View style={styles.topSection}>
          <View style={styles.leftRow}>
            <Text style={styles.cardTitle}>{item.need}</Text>
          </View>
          <View>
            {item.approvalStatus ? <SuccessIcon /> : <ErrorIcon />}
          </View>
        </View>

        {/* Bottom Colored Section (contains the white details) */}
        <View style={styles.bottomSection}>
          <View style={styles.detailsContainer}>
            {/* Description Row */}
            <View style={[styles.detailRow, styles.dottedBorder]}>
              <FlagIcon width={18} height={18} />
              <Text style={styles.detailText}>
                Description: {item.description}
              </Text>
            </View>
            {/* Start Date Row */}
            <View style={[styles.detailRow, styles.dottedBorder]}>
              <CalenderColorIcon width={18} height={18} />
              <Text style={styles.detailText}>Start Date: {item.startDate}</Text>
            </View>
            {/* End Date Row (no dotted border on last row) */}
            <View style={styles.detailRow}>
              <CalenderColorIcon width={18} height={18} />
              <Text style={styles.detailText}>End Date: {item.endDate}</Text>
            </View>
          </View>
        </View>

        {/* Button Outside the Bottom Section */}
        <View style={styles.buttonWrapper}>
          <CustomButtonField
            buttonText="Support"
            onPress={() => {
              console.log('Support button pressed for:', item.need);
            }}
            style={styles.supportButton}
            textColor="#fff"
            textStyle={styles.supportButtonText}
          />
        </View>
      </View>
    ));
  };

  if (loading) {
    return (
        <ContainerProvider
        headerProps={{type: 2, headerTitle: `Hello,${user?.firstName}`}}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      </ContainerProvider>
    );
  }

  if (error) {
    return (
        <ContainerProvider
        headerProps={{type: 2, headerTitle: `Hello,${user?.firstName}`}}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ContainerProvider>
    );
  }

  return (
    <ContainerProvider
      headerProps={{ type: 2, headerTitle: `Hello, ${user?.firstName}` }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.mainHeading}>Needs</Text>
        {renderNeeds()}
      </ScrollView>
    </ContainerProvider>
  );
};

export default NeedsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16,
  },

  // Card Container
  card: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,

    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // elevation: 0.1,
  },

  // Top Section
  topSection: {
    backgroundColor: '#9ACEF8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },

  // Bottom Section
  bottomSection: {
    backgroundColor: '#FFC478',
    paddingHorizontal: 10,
    paddingTop: 12,
    marginTop: 5,
    borderRadius: 10,
    paddingBottom: 10, // more space at bottom if needed
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 6,
  },

  // Dotted border style (optional for middle rows)
  dottedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dotted',
  },

  // Button
  buttonWrapper: {
    alignItems: 'center',
    // backgroundColor: '#f9f9f9', // remove this line
    // or replace with:
    // backgroundColor: 'transparent',
    paddingVertical: 5,
    borderRadius: 10,
  },
  supportButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  supportButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
