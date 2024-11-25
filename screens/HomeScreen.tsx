import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices, useCameraDevice } from 'react-native-vision-camera';
import Tesseract from 'tesseract.js';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const devices = useCameraDevices();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null)

  useEffect(() => {
    const getPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };
    getPermissions();
  }, []);

  const takePicture = async () => {
    if (!device) {
      console.warn('Aucun appareil photo disponible.');
      return;
    }

    try {
      const photo = await camera.current.takePhoto()
      recognizeText(photo.path);
    } catch (error) {
      console.error('Erreur lors de la prise de photo :', error);
    }
  };

  const recognizeText = async (imagePath) => {
    try {
      const result = await Tesseract.recognize(imagePath, 'eng', {
        logger: (info) => console.log(info), // Log de la progression
      });
      setOcrText(result.data.text);
    } catch (error) {
      console.error('Erreur lors de la reconnaissance de texte :', error);
    }
  };

  const searchCard = (text) => {
    console.log(`Recherche pour: ${text}`);
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
          <Text>{ocrText}</Text>
        </>
      ) : (
        <Text>Aucun appareil disponible</Text>
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
