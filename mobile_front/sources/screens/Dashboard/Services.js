import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import PropTypes from 'prop-types';

const data =
  [
    {
      'name': 'github',
      'actions': [
        {
          'name': 'new_star',
          'description': 'A star has been added to a repository',
          'params': {
            'repository': 'string'
          }
        },
        {
          'name': 'rm_star',
          'description': 'A star has been removed on a repository',
          'params': {
            'repository': 'string'
          }
        },
        {
          'name': 'new_fork',
          'description': 'A repository has been forked',
          'params': {
            'repository': 'string'
          }
        },
        {
          'name': 'new_pull_request',
          'description': 'A new pull request has been created',
          'params': {
            'repository': 'string'
          }
        },
        {
          'name': 'closed_pull_request',
          'description': 'A pull request has been closed',
          'params': {
            'repository': 'string'
          }
        },
        {
          'name': 'new_push',
          'description': 'A new push has been made to a repository',
          'params': {
            'repository': 'string'
          }
        }
      ],
      'reactions': [
      ]
    },
    {
      'name': 'discord',
      'actions': [
      ],
      'reactions': [
        {
          'name': 'send_a_private_message',
          'description': 'Send you a private message',
          'params': {
            'username': 'string'
          }
        }
      ]
    },
    {
      'name': 'pivotaltracker',
      'actions': [
        {
          'name': 'story_create_activity',
          'description': 'A new story has been created',
          'params': {
            'projectId': 'string'
          }
        }
      ],
      'reactions': [
      ]
    }
  ];

const ServicesItem = ({name}) => {
  return (
    <View style={{padding: 10}}>
      <Button contentStyle={styles.btn} icon="github" mode="outlined" onPress={() => console.log('ok')} >
        {name}
      </Button>
    </View>
  );
};

const Services = ({navigation}) => {
  const renderItem = ({ item }) => <ServicesItem name={item.name} />;

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Choose a service
      </Headline>
      <FlatList
        data={data}
        keyExtractor={item => item.name}
        renderItem={renderItem}
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
    padding: 10
  },
  btnContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn : {
    padding: 10,
  }
});

Services.propTypes = {
  navigation: PropTypes.object,
};


export default Services;