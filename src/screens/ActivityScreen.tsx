import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import ContainerProvider from '../components/providers/ContainerProvider';
import HeaderView from '../components/view/HeaderView';
import { CalenderColorIcon } from '../assets/svg';
import { useAuthState } from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';

// Helper: Convert an ArrayBuffer to a Base64 string
export const bufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString('base64');
};

// Helper: Determine the MIME type based on the file extension
const getMimeType = (fileName) => {
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

// Helper: Fetch image data for a given news feed item
const fetchImageForItem = async (item) => {
  try {
    const encodedPath = encodeURIComponent(item.filePath);
    const imageResponse = await API_INSTANCE.get(
      `v1/storage/fetch-any-file-from-storage-by-path?filePath=${encodedPath}`,
      { responseType: 'arraybuffer' }
    );
    const buffer = imageResponse.data;
    const mimeType = getMimeType(item.fileName);
    const base64Image = `data:${mimeType};base64,${bufferToBase64(buffer)}`;
    return { ...item, imageUrl: base64Image };
  } catch (error) {
    console.error(`Error fetching image for ${item.fileName}:`, error);
    return { ...item, imageUrl: null };
  }
};

// Helper: Transform a news feed item to the local data format
const transformNewsFeedToLocal = (item) => {
  return {
    imageUrl: item.imageUrl, // fetched & converted image URL
    title: item.name,         // using "name" as the title
    description: item.description,
    subject: item.subject,
    date: item.date,
  };
};

// ExpandableText Component: Limits text to a number of lines and shows a "Read More"/"Show Less" toggle.
const ExpandableText = ({ text, numberOfLines = 3, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  // onTextLayout checks whether the text exceeds the limit.
  const onTextLayout = (e) => {
    const { lines } = e.nativeEvent;
    if (lines.length > numberOfLines) {
      setShowReadMore(true);
    }
  };

  return (
    <View>
      <Text
        style={style}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      {showReadMore && (
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const ActivityScreen = ({ route }) => {
  const { user } = useAuthState() ?? {};
  const [orphanageDetails, setOrphanageDetails] = useState(null);
  const [newsFeed, setNewsFeed] = useState([]);
  const [orphanageLoading, setOrphanageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orphanage details when the user is available
  useEffect(() => {
    const fetchOrphanageDetails = async () => {
      try {
        const response = await API_INSTANCE.get(
          `v1/admin/filter-orphanage-by-algorithm?pincode=${user?.pincode}&type=${user?.interestIn}`
        );
        // Assuming the API returns the details in response.data.data
        setOrphanageDetails(response?.data?.data);
      } catch (err) {
        console.error('Error fetching orphanage details:', err);
        setError('Failed to fetch orphanage details.');
      } finally {
        setOrphanageLoading(false);
      }
    };

    if (user) {
      fetchOrphanageDetails();
    } else {
      setOrphanageLoading(false);
    }
  }, [user]);

  // Once orphanage details are loaded, parse the newsFeeds and fetch images
  useEffect(() => {
    const fetchNewsFeedImages = async () => {
      if (orphanageDetails && orphanageDetails.newsFeeds) {
        let parsedNewsFeed = [];
        try {
          parsedNewsFeed = JSON.parse(orphanageDetails.newsFeeds);
          console.log('Parsed NewsFeed:', parsedNewsFeed);
        } catch (parseError) {
          console.error('Error parsing newsFeeds:', parseError);
          setError('Failed to parse news feed data.');
          setImagesLoading(false);
          return;
        }
        try {
          // Fetch image data for each item
          const updatedNewsFeed = await Promise.all(
            parsedNewsFeed.map((item) => fetchImageForItem(item))
          );
          // Transform fetched items into the local data format
          const localFormattedNewsFeed = updatedNewsFeed.map((item) =>
            transformNewsFeedToLocal(item)
          );
          setNewsFeed(localFormattedNewsFeed);
        } catch (err) {
          console.error('Error fetching news feed images:', err);
          setError('Failed to load news feed images.');
        } finally {
          setImagesLoading(false);
        }
      } else {
        setImagesLoading(false);
      }
    };

    fetchNewsFeedImages();
  }, [orphanageDetails]);

  // Render a single activity card in the local data format
  const renderActivityCard = ({ item }) => (
    <Pressable style={styles.card}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>
            {item.title} ({item.date})
          </Text>
          {/* Uncomment below if you want to show the calendar icon */}
          {/* <CalenderColorIcon /> */}
        </View>
        <Text style={styles.titleText1}>{item.subject}</Text>
        <ExpandableText text={item.description} style={styles.descriptionText} />
      </View>
    </Pressable>
  );

  return (
    <ContainerProvider>
      <HeaderView type={3} headerTitle="Activities" />
      <View style={styles.container}>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {(orphanageLoading || imagesLoading) ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={newsFeed}
            renderItem={renderActivityCard}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </ContainerProvider>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  card: {
    borderWidth: 2,
    borderColor: '#EBE9E9',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: 120,
    marginVertical: 12,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 125,
    height: 125,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  titleText1: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  descriptionText: {
    fontSize: 13,
    flexWrap: 'wrap',
    flex: 1,
  },
  readMoreText: {
    color: 'blue',
    marginTop: 4,
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
