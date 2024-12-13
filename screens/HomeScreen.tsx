import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices, useCameraDevice } from 'react-native-vision-camera';
import { readFile } from 'react-native-fs';
import axios from 'axios';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const devices = useCameraDevices();
  const device = useCameraDevice('back');
  const camera = useRef(null);

  const CLOUD_VISION_API_KEY = 'AIzaSyDKDhb93fOKOMnK-KYF78kdLpg3gKHlDPw';

  useEffect(() => {
    const getPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const takePicture = async () => {
    if (!device) {
      console.warn('Aucun appareil photo disponible.');
      return;
    }

    try {
      const photo = await camera.current.takePhoto({
        skipMetadata: true,
      });

      const imagePath = photo.path;
      const imageBase64 = await readFile(imagePath, 'base64');
      recognizeText(imageBase64);
    } catch (error) {
      console.error('Erreur lors de la prise de photo :', error);
    }
  };

  const recognizeText = async (base64Image) => {
    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${CLOUD_VISION_API_KEY}`,
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }
      );

      const text = response.data.responses[0]?.textAnnotations[0]?.description || 'Aucun texte détecté.';
      setOcrText(text);
      searchCard(text);
    } catch (error) {
      console.error('Erreur lors de la reconnaissance de texte :', error);
      Alert.alert('Erreur', 'Impossible de détecter le texte.');
    }
  };

  const searchCard = (text) => {
    console.log(`Recherche pour : ${text}`);
  };

  if (!hasPermission) {
    return <Text>Permission caméra refusée ou non accordée.</Text>;
  }

  return (
    <View style={styles.container}>
      {device ? (
        <>
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          <Button title="Prendre une photo" onPress={takePicture} />
          <Text>{ocrText || 'Aucun texte détecté.'}</Text>
        </>
      ) : (
        <Text>Aucun appareil disponible.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default HomeScreen;
