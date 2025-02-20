import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
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

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = (size) => (width / guidelineBaseWidth) * size;

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
    title: item.name, // using "name" as the title
    description: item.description,
    subject: item.subject,
    date: item.date,
  };
};

// ExpandableText Component with onToggle callback prop
const ExpandableText = ({ text, numberOfLines = 3, style, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const onTextLayout = (e) => {
    const { lines } = e.nativeEvent;
    if (lines.length > numberOfLines) {
      setShowReadMore(true);
    }
  };

  const handleToggle = () => {
    const newVal = !isExpanded;
    setIsExpanded(newVal);
    if (onToggle) onToggle(newVal);
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
        <Pressable onPress={handleToggle}>
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

// ActivityCard Component: Changes layout and image styling based on expanded state
const ActivityCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  // When expanded, stretch the image container to full width and remove the right margin.
  const imageContainerStyle = expanded
    ? [styles.imageContainer, { width: '100%', marginRight: 0, marginBottom: 10,}]
    : styles.imageContainer;

  // When expanded, stretch the image to full width and adjust the height.
  const imageStyle = expanded
    ? [styles.imageStyle, { width: '100%', height: 200,resizeMode: 'contain'  }]
    : styles.imageStyle;

  return (
    <Pressable style={[styles.card, { flexDirection: expanded ? 'column' : 'row' }]}>
      <View style={imageContainerStyle}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={imageStyle} />
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
        </View>
        <Text style={styles.titleText1}>{item.subject}</Text>
        <ExpandableText
          text={item.description}
          style={styles.descriptionText}
          onToggle={(val) => setExpanded(val)}
        />
      </View>
    </Pressable>
  );
};

const ActivityScreen = ({ route }) => {
  const { user } = useAuthState() ?? {};
  const [orphanageDetails, setOrphanageDetails] = useState(null);
  const [newsFeed, setNewsFeed] = useState(null);
  const [orphanageLoading, setOrphanageLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [hasFetchedNewsFeed, setHasFetchedNewsFeed] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orphanage details when the user is available
  useEffect(() => {
    const fetchOrphanageDetails = async () => {
      try {
        const response = await API_INSTANCE.get(
          `v1/admin/filter-orphanage-by-algorithm?pincode=${user?.pincode}&type=${user?.interestIn}`
        );
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

  // Fetch news feed images once orphanage details are loaded
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
          setNewsFeed([]);
          setImagesLoading(false);
          setHasFetchedNewsFeed(true);
          return;
        }
        try {
          const updatedNewsFeed = await Promise.all(
            parsedNewsFeed.map((item) => fetchImageForItem(item))
          );
          const localFormattedNewsFeed = updatedNewsFeed.map((item) =>
            transformNewsFeedToLocal(item)
          );
          setNewsFeed(localFormattedNewsFeed);
        //   setNewsFeed([
        //     {
        //         "imageUrl": "https://imageuploadtestingbob.s3.us-east-2.amazonaws.com/dev/alpino/g1.png",
        //         "title": "New year party",
        //         "description": "If you’re hosting a grand soiree, you want to make sure your guests know that it’s a fancy and formal occasion. In your invitation wording, play up the most elegant details of what you have planned to entice your guests. Will formal dress be required? Will you have high-end hors d’oeuvres and a champagne toast? Will the event be held in a beautiful hall or be sumptuously decorated? Let your guests know!\n\n",
        //         "subject": "Rave Party",
        //         "date": "2025-02-15"
        //     },
        //     {
        //       "imageUrl": "https://imageuploadtestingbob.s3.us-east-2.amazonaws.com/dev/alpino/g1.png",
        //       "title": "New year party",
        //       "description": "If you’re hosting a grand soiree, you want to make sure your guests know that it’s a fancy and formal occasion. In your invitation wording, play up the most elegant details of what you have planned to entice your guests. Will formal dress be required? Will you have high-end hors d’oeuvres and a champagne toast? Will the event be held in a beautiful hall or be sumptuously decorated? Let your guests know!\n\n",
        //       "subject": "Rave Party",
        //       "date": "2025-02-15"
        //   }
        // ])
          console.log(localFormattedNewsFeed)
        } catch (err) {
          console.error('Error fetching news feed images:', err);
          setError('Failed to load news feed images.');
          setNewsFeed([]);
        } finally {
          setImagesLoading(false);
          setHasFetchedNewsFeed(true);
        }
      } else {
        setNewsFeed([]);
        setImagesLoading(false);
        setHasFetchedNewsFeed(true);
      }
    };

    fetchNewsFeedImages();
  }, [orphanageDetails]);

  const isLoading = orphanageLoading || imagesLoading || !hasFetchedNewsFeed;

  if (error) {
    return (
      <ContainerProvider>
        <HeaderView type={3} headerTitle="Activities" />
        <View style={styles.container}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      </ContainerProvider>
    );
  }

  if (isLoading) {
    return (
      <ContainerProvider>
        <HeaderView type={3} headerTitle="Activities" />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      </ContainerProvider>
    );
  }

  if (newsFeed.length === 0) {
    return (
      <ContainerProvider>
        <HeaderView type={3} headerTitle="Activities" />
        <View style={styles.container}>
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/images/noact.png')}
              style={styles.sponImage}
            />
            <Text style={styles.infoText}>
              Stay Tuned: New Updates Coming Soon
            </Text>
          </View>
        </View>
      </ContainerProvider>
    );
  }

  return (
    <ContainerProvider>
      <HeaderView type={3} headerTitle="Activities" />
      <View style={styles.container}>
        <FlatList
          data={newsFeed}
          renderItem={({ item }) => <ActivityCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: '#EBE9E9',
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
    // backgroundColor: '#e0e0e0',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sponImage: {
    width: scale(160),
    height: scale(120),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16,
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
    marginBottom: 6,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  titleText1: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
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
