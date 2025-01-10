import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //importing navigation container
import { createStackNavigator } from '@react-navigation/stack'; //importing navigation stack
import { Cell, Section, TableView } from 'react-native-tableview-simple'; //importing table-view

//calculating screen dimension
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

//creating stacks
const Stack = createStackNavigator(); 

export default function App() {
  return (
    //creating navigation containers Restaurants and Menu  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" 
                      component={Home} 
                      options={{headerTitleAlign: "center"}}/>
        <Stack.Screen name="Menu" 
                      component={Menu} 
                      options={{headerTitleAlign: "center"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
 //Home screen page
function Home({navigation}) { 
  return (
    //allowing safe margins, setting 100% scrolling effect and displaying Homescreen Cells
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        <TableView>
          <Section hideSeparator separatorTintColor="#ccc">
            {outlets.map((restaurant, index) => (
              <HomescreenCell 
                key={index}
                title={restaurant.title}
                tagline={restaurant.tagline}
                eta={restaurant.eta}
                imgUri={restaurant.imgUri}
                action={() => navigation.navigate('Menu', { items: restaurant.items })}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  )
}

//Menu screen page
function Menu({route}) { 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{height: '100%'}}>
        <TableView style={styles.menuTable}>
          {route.params.items.map((item, index) => (
            <View key={index}>
              <Image
                style={styles.menuSectionImage}
                source={item.imgUri}/>  
              <Text style={styles.menuItemHeaderText}>{item.title}</Text>
              <Section title={item.title} separatorTintColor="#ccc">
                {item.contents.map((content, index) => (
                  <Cell title={content.title} key={index}/>
                ))}
              </Section>
            </View>
          ))}
        </TableView>
      </ScrollView>
    </SafeAreaView>
  )
}

//Home screen cells and the details
function HomescreenCell({title, tagline, eta, imgUri, action, ...props}) { 
  return (
    <Cell
      {...props}
      backgroundColor="transparent"
      highlightUnderlayColor="#ccc"
      contentContainerStyle={styles.contentContainer}
      onPress={action}
      cellContentView={
        <View style={styles.cell}>
          <Image
            style={styles.cellImage}
            source={imgUri}
          />
          <View style={styles.tagline}>
            <Text style={styles.taglineText}>{eta}</Text>
            <Text style={styles.taglineText}>mins</Text>
          </View>
          
          <View>
            <Text style={styles.cellContainerTitle}>{title}</Text>
            <Text style={styles.cellContainerSubtitle}>{tagline}</Text>
          </View>
        </View>
      }
    />
  )
}

//Restaurant outlet menu item tables
const outlets = [
  {
    title: "Joe's Gelato",
    tagline: 'Desert, Ice cream, £££',
    eta: '10-30',
    imgUri: require('./images/gelato.jpg'),
    items: [
      { 
        title: 'Gelato', 
        imgUri: require('./images/ice-cream.jpg'),
        contents:[
          { title: 'Vanilla' },
          { title: 'Chocolate' },
          { title: 'Mint' },
          { title: 'Strawberry'}
        ] 
      },
      { 
        title: 'Coffee', 
        imgUri: require('./images/capuccino.jpg'),
        contents:[
          { title: 'Flat white' },
          { title: 'Latte' },
          { title: 'Caffè Americano' },
          { title: 'Capuccino'}
        ] 
      }
    ]
  },
  {
    title: "Joe's Diner",
    tagline: 'American, burgers, ££',
    eta: '50+',
    imgUri: require('./images/diner.jpg'),
    items: [
      { 
        title: 'Roasted Meat', 
        imgUri: require('./images/roast.jpg'),
        contents:[
          { title: 'Lamb' },
          { title: 'Mutton' },
          { title: 'Chicken' },
          { title: 'Beef'},
          { title: 'Pork'}
        ] 
      },
      { 
        title: 'Fries', 
        imgUri: require('./images/fries.jpg'),
        contents:[
          { title: 'Chicken Fry' },
          { title: 'French Fries' },
        
        ] 
      },
    ]
  },
  {
    title: "Desert Delights",
    tagline: 'Desert, sweets, ££',
    eta: '10-25',
    imgUri: require('./images/sweets.jpg'),
    items: [
      { 
        title: 'Sweets', 
        imgUri: require('./images/sweet.jpg'),
        contents:[
          { title: 'Golap Jaam' },
          { title: 'Rosho Golla' },
          { title : 'Rosho Malai'},
          { title : 'Kheer Mohon'},
        ] 
      },
      { 
        title: 'Cakes',
        imgUri: require('./images/cakes.jpg'),
        contents:[
          { title: 'Cheese Cake' },
          { title: 'Chocoate Cake' },
          { title: 'Red-Velvet Cake' },
          { title: 'Strawberry Cake' },

        ] 
      },
    ]
  }
]

const styles = StyleSheet.create({
  //container styling with safe margin allowance
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
  },
  //content container styling
  contentContainer: {
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //cell stylings
  cell: {
    position: 'relative',
  },
  cellImage: {
    height: '68%',
    width: SCREEN_WIDTH - 35,
    borderRadius: 7
  },
  tagline: {
    paddingHorizontal: 23,
    borderRadius: 80,
    paddingVertical: 3,
    marginTop: -25,
    marginRight: 14,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  
  },
  taglineText: {
    fontWeight: 'bold',
  },
  cellContainerTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 4,
    marginTop: -12
  },
  cellContainerSubtitle: {
    color: 'grey',
    fontSize: 13,
  },
  //menu stylings
  menuTable: {
    marginTop: 18
  },
  menuSectionImage: {
    width: SCREEN_WIDTH,
    height: 150,
  },
  menuItemHeaderText: {
    alignSelf: 'flex-start',
    padding: 7,
    borderRadius: 7,
    fontSize: 18,
    marginTop: -47,
    marginLeft: 15,
    fontWeight: 'bold',
    color: "black",
    backgroundColor: 'yellow',
    
  },
  
});

