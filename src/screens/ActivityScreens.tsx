import {Buffer} from 'buffer';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CalenderColorIcon,
  ErrorIcon,
  FlagIcon,
  SuccessIcon,
} from '../assets/svg';
import CustomButtonField from '../components/fields/CustomButtonField';
import ContainerProvider from '../components/providers/ContainerProvider';
import API_INSTANCE from '../config/apiClient';
import {useAuthState} from '../context/AuthContext';

// Convert an ArrayBuffer to a Base64 string
export const bufferToBase64 = buffer => {
  return Buffer.from(buffer).toString('base64');
};

// Determine the MIME type based on the file extension
const getMimeType = fileName => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'avif':
      return 'image/avif';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
};

// Fetch image data for a given newsFeed item
const fetchImageForItem = async item => {
  try {
    const encodedPath = encodeURIComponent(item.filePath);
    // const encodedPath = 'storage%2FTN600100-0001%2FLOGO_l91rv_akshaya-logo-e1698932908729-300x267.webp'
    const imageResponse = await API_INSTANCE.get(
      `v1/storage/fetch-any-file-from-storage-by-path?filePath=${encodedPath}`,
      {responseType: 'arraybuffer'},
    );
    const buffer = imageResponse.data;
    const mimeType = getMimeType(item.fileName);

    const base64Image = `data:${mimeType};base64,${bufferToBase64(buffer)}`;

    return {...item, imageUrl: base64Image};
  } catch (error) {
    console.error(`Error fetching image for ${item.fileName}:`, error);
    return {...item, imageUrl: null};
  }
};

const ActivitiesScreen = ({route}) => {
  const {user} = useAuthState() ?? {};
  const {orphanageDetails} = route.params;

  let parsedNewsFeed = [];
  try {
    parsedNewsFeed = JSON.parse(orphanageDetails.newsFeeds);
  } catch (parseError) {
    console.error('Error parsing newsFeeds:', parseError);
  }

  const [newsFeed, setNewsFeed] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsFeedImages = async () => {
    try {
      const updatedNewsFeed = await Promise.all(
        parsedNewsFeed.map(item => fetchImageForItem(item)),
      );
      setNewsFeed(updatedNewsFeed);
    } catch (error) {
      console.error('Error fetching news feed images:', error);
      setError('Failed to load news feed images.');
    } finally {
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsFeedImages();
  }, []);

  const renderNewsFeed = () => {
    if (newsFeed.length === 0) {
      return (
        <Text style={styles.infoText}>
          No activities found for this orphanage
        </Text>
      );
    }

    return newsFeed.map((item, index) => (
      <View style={styles.card} key={index}>
        <View style={styles.topSection}>
          <View style={styles.leftRow}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        </View>
        {item.imageUrl ? (
          <Image
            source={{uri: item.imageUrl}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        {/* <View style={styles.bottomSection}> */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText1}>{item.subject}</Text>
          <View style={[styles.detailRow, styles.dottedBorder]}>
            {/* <FlagIcon width={18} height={18} /> */}
            <Text style={styles.detailText}>{item.description}</Text>
          </View>
          <View style={[styles.detailRow, styles.dottedBorder]}>
            <CalenderColorIcon width={18} height={18} />
            <Text style={styles.detailText}>
              Start Date: {item.startDate || item.subject}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <CalenderColorIcon width={18} height={18} />
            <Text style={styles.detailText}>
              End Date: {item.endDate || item.subject}
            </Text>
          </View>
        </View>
        {/* </View> */}
        {/* <View style={styles.buttonWrapper}>
          <CustomButtonField
            buttonText="Support"
            onPress={() => {
              console.log('Support button pressed for:', item.activityId);
            }}
            style={styles.supportButton}
            textColor="#fff"
            textStyle={styles.supportButtonText}
          />
        </View> */}
      </View>
    ));
  };

  if (imagesLoading) {
    return (
      <ContainerProvider
        headerProps={{type: 2, headerTitle: `Hello, ${user?.firstName}`}}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{marginTop: 10}}>Loading...</Text>
        </View>
      </ContainerProvider>
    );
  }

  if (error) {
    return (
      <ContainerProvider
        headerProps={{type: 2, headerTitle: `Hello, ${user?.firstName}`}}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ContainerProvider>
    );
  }

  return (
    <ContainerProvider
      headerProps={{type: 2, headerTitle: `Hello, ${user?.firstName}`}}>
      <ScrollView style={styles.container}>
        <Text style={styles.mainHeading}>Activities</Text>
        {renderNewsFeed()}
      </ScrollView>
    </ContainerProvider>
  );
};

export default ActivitiesScreen;

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
  card: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  topSection: {
    backgroundColor: '#ace6d9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  imageStyle: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  placeholderContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  bottomSection: {
    backgroundColor: '#eef0ed',
    paddingHorizontal: 10,
    paddingTop: 12,
    marginTop: 5,
    borderRadius: 10,
    paddingBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#ffcffe',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '95%',
    alignSelf: 'center',
    marginTop: 2,
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
  detailText1: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginLeft: 6,
  },
  dottedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dotted',
  },
  buttonWrapper: {
    alignItems: 'center',
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
    color: '#fff',
  },
});
