/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import * as RNIap from 'react-native-iap';
 
 const Section = ({children, title}): Node => {
   const isDarkMode = useColorScheme() === 'dark';
   useEffect(() => {
     initilizeIAPConnection();
  
   }, []);
 
   const itemSubs = Platform.select({
 
     ios: ['your_product_id_ios'],
  
     android: ['your_product_id_android'],
  
   });
  
   const initilizeIAPConnection = async () => {
  
     await RNIap.initConnection()
  
       .then(async (connection) => {
  
         console.log('IAP result', connection);
  
         getItems();
  
       })
  
       .catch((err) => {
  
         console.warn(`IAP ERROR ${err.code}`, err.message);
  
       });
  
       await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
  
         .then(async(consumed) => {
  
         console.log('consumed all items?', consumed);
  
       }).catch((err) => {
  
         console.warn(`flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`, err.message);
  
       });
  
   };
   const getItems = async () => {
 
     try {
  
       console.log("itemSubs ",itemSubs);
  
       const Products = await RNIap.getSubscriptions(itemSubs);
  
       console.log(' IAP Su', Products);
  
       if (Products.length !== 0){
  
         if (Platform.OS === 'android'){
  
         //Your logic here to save the products in states etc
  
         } else if (Platform.OS === 'ios'){
  
         // your logic here to save the products in states etc
  
         // Make sure to check the response differently for android and ios as it is different for both
  
         }
  
       }
  
     } catch (err) {
  
       console.warn("IAP error",err.code, err.message, err);
  
     
  
     }
  
   };
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Step One">
             Edit <Text style={styles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
           <LearnMoreLinks />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 