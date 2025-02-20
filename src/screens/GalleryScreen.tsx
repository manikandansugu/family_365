import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from 'react-native';
import ContainerProvider from '../components/providers/ContainerProvider';
import { useAuthState } from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';
  
// Utility function to convert ArrayBuffer to Base64
export const bufferToBase64 = (buffer) => {
  const binary = [];
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary.push(String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize)));
  }

  return btoa(binary.join(''));
};
  
const GalleryScreen = () => {
  const { user } = useAuthState() ?? {};
  const [images, setImages] = useState([]); // To store the list of base64 images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const fetchImageData = async () => {
    try {
      console.log('idddd', user?.orphanageId);
      const metadataResponse = await API_INSTANCE.get(
        `v1/storage/fetch-all-files-info-from-storage?id=${user?.orphanageId}&uploaderType=ORPHANAGE`
      );

      const metadataJson = await metadataResponse.data;

      if (!metadataJson.data) {
        throw new Error('Failed to fetch metadata');
      }

      const imagePromises = metadataJson.data.map(async (item) => {
        const imagePath = encodeURIComponent(item.filePath); // Ensure filePath is URL-encoded
        console.log(imagePath);
        const imageResponse = await API_INSTANCE.get(
          `v1/storage/fetch-any-file-from-storage-by-path?filePath=${imagePath}`,
          { responseType: 'arraybuffer' }
        );

        const buffer = await imageResponse.data; // Fetch binary data
        const base64Image = `data:image/png;base64,${bufferToBase64(buffer)}`;
        return base64Image;
      });

      const fetchedImages = await Promise.all(imagePromises);
      setImages(fetchedImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('No gallery images for Orphanage');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const handleImagePress = (image) => {
    setCurrentImage(image);
    setModalVisible(true);
  };

  return (
    <ContainerProvider headerProps={{ type: 2, headerTitle: `Hello, ${user?.firstName}` }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          !loading && !error && images.length === 0 ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : {}
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : images.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/images/noact.png')}
              style={styles.sponImage}
            />
            <Text style={styles.infoText}>
              No gallery images for Orphanage
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.mainHeading}>Gallery</Text>
            <Text style={styles.subHeading}>Discover Moments Captured at Our Orphanage</Text>
            <View style={styles.imageGrid}>
              {images.map((image, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onLongPress={() => handleImagePress(image)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            {currentImage && (
              <Image
                source={{ uri: currentImage }}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Modal>
    </ContainerProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sponImage: {
    width: 160,
    height: 120,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
