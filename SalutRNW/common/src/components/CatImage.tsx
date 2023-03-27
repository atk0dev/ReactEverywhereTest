import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

const CatImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg,png', {
      headers: {
        'x-api-key': 'live_MHHG9FBaIxCgCKYiJrrNHrmAkmGCiRONstEV1RA0dBKmvHfGP2FDBuVpHlvmSFoy',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data[0].url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRefresh = () => {
    setImageUrl(null);
    fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg,png', {
      headers: {
        'x-api-key': 'live_MHHG9FBaIxCgCKYiJrrNHrmAkmGCiRONstEV1RA0dBKmvHfGP2FDBuVpHlvmSFoy',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(imageUrl);
        setImageUrl(data[0].url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default CatImage;
