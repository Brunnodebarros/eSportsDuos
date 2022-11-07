import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { GameParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';



export function Game() {

  const route = useRoute();
  const game = route.params as GameParams;
  const navigaton = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack(){
    navigaton.goBack();
  }
  useEffect(() => {
    fetch(`http://192.168.0.110:3333/games/${game.id}/ads`)
    .then(Response => Response.json())
    .then(data => { setDuos(data) });

}, []);


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={ styles.header }>

          <TouchableOpacity onPress = { handleGoBack }>
            <Entypo 
              name = "chevron-thin-left"
              color = {THEME.COLORS.CAPTION_300}  
              SIZE = {20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style = {styles.logo}
          />

          <View style = {styles.right} />

        </View>

        <Image 
          source = {{ uri: game.bannerUrl }}
          style = { styles.cover }
          resizeMode = "cover"
        />

        <Heading 
          title = {game.title}
          subtitle = "Conecte-se e começe a Jogar!"
        />

        <FlatList 
          data = {duos}
          keyExtractor = {item => item.id}
          renderItem = {({ item }) => (
            <DuoCard data = {item} />
          )} 
        />

      </SafeAreaView>
    </Background>
  );
}