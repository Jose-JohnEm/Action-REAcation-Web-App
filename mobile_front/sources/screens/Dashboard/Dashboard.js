import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Caption, Divider, FAB, Headline, IconButton, Paragraph, Switch } from 'react-native-paper';
import PropTypes from 'prop-types';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    desc: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second ItemSecond ItemSecond ItemSecond Item',
    desc: 'Ceci est une longue description de fou malade sah tu COLLES',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    desc: 'First Item',
  },
];

const Item = ({ title, desc }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{paddingTop: 20}}>
      <View style={styles.containerItem}>
        <View style={styles.containerContent}>
          <Headline>{title}</Headline>
          <Paragraph>{desc}</Paragraph>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Switch value={isSwitchOn} color="#0077b6" onValueChange={onToggleSwitch} />
          <IconButton
            icon="trash-can-outline"
            color="red"
            size={25}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </View>
  );
};


const Dashboard = ({navigation}) => {
  const renderItem = ({ item }) => <Item title={item.title} desc={item.desc}/>;

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        My AREA
      </Headline>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.push('Services')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  headline : {
    textAlign: 'center',
    color:'#0077b6',
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderColor: '#0077b6',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevated: 20,

  },
  containerContent : {
    flex: 0.9
  },
  fab: {
    backgroundColor: '#0077b6',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

Dashboard.propTypes = {
  navigation: PropTypes.object,
};


export default Dashboard;