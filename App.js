import * as React from 'react';

import {
  Button,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Dengage from '@dengage-tech/react-native-dengage';

export default function App() {
  const [contactKey, setContactKey] = React.useState('checking...');
  const [subscription, setSubscription] = React.useState('');
  const [subscriptionHidden, toggleSubscription] = React.useState(false);

  const pageViewExample = () => {
    // pageView event example
    Dengage.pageView({
      product_id: 1,
      product_variant_id: 1,
      quantity: 1,
      unit_price: 10.0,
      discounted_price: 9.99,
    });
  };
  const addToCartExample = () => {
    // addToCart action starts here.
    // All items currently exists in shopping cart must be added to an array
    const cartItem = {};
    cartItem.product_id = 1;
    cartItem.product_variant_id = 1;
    cartItem.quantity = 1;
    cartItem.unit_price = 10.0;
    cartItem.discounted_price = 9.99;
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = [];
    cartItems.push(cartItem);
    cartItems.push(cartItem);

    // Add to cart action
    const addParams = {
      product_id: 1,
      product_variant_id: 1,
      quantity: 1,
      unit_price: 10.0,
      discounted_price: 9.99,
      // ... extra columns in shopping_cart_events table, can be added here
      cartItems: cartItems, // all items in cart
    };
    Dengage.addToCart(addParams);
    // addToCart action ends here.
  };
  const removeFromCartExample = () => {
    const cartItem = {};
    cartItem.product_id = 1;
    cartItem.product_variant_id = 1;
    cartItem.quantity = 1;
    cartItem.unit_price = 10.0;
    cartItem.discounted_price = 9.99;
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = [];
    cartItems.push(cartItem);
    cartItems.push(cartItem);

    // Remove from cart action
    const removeParams = {
      product_id: 1,
      product_variant_id: 1,
      quantity: 1,
      unit_price: 10.0,
      discounted_price: 9.99,
      // ... extra columns in shopping_cart_events table, can be added here
      cartItems: cartItems, // all items in cart
    };
    Dengage.removeFromCart(removeParams);
  };
  const viewCart = () => {
    const cartItem = {};
    cartItem.product_id = 1;
    cartItem.product_variant_id = 1;
    cartItem.quantity = 1;
    cartItem.unit_price = 10.0;
    cartItem.discounted_price = 9.99;
    // ... extra columns in shopping_cart_events_detail table, can be added in cartItem

    let cartItems = [];
    cartItems.push(cartItem);
    cartItems.push(cartItem);
    Dengage.viewCart(cartItems);
  };
  const appInboxExamples = async () => {
    const inboxMessages = await Dengage.getInboxMessages(10, 20).catch(
      err => err,
    );
    console.log('inboxMessages', inboxMessages);

    const delResponse = await Dengage.deleteInboxMessage(
      'your-message-id-here',
    ).catch(res => res);
    console.log('deleteInboxMessage: ', delResponse);

    const messageSetAsInboxRes = await Dengage.setInboxMessageAsClicked(
      'your-message-id-here',
    ).catch(res => res);
    console.log('messageSetAsInboxRes: ', messageSetAsInboxRes);
  };

  React.useEffect(() => {
    Dengage.setLogStatus(true);
    init();
  }, []);

  const init = async () => {
    if (Platform.OS === 'ios') {
      Dengage.registerForRemoteNotifications(true);
    }
    setContactKey(await Dengage.getContactKey());
    Dengage.setLogStatus(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyles}
      style={styles.container}>
      <View style={styles.btnContainer}>
        <Button
          onPress={async () => {
            const hasPermissions = await Dengage.getUserPermission();
            alert('hasPermissions: ' + hasPermissions);
          }}
          title={'check Permission'}
        />
      </View>

      {Platform.OS === 'ios' && (
        <View style={styles.btnContainer}>
          <Button
            onPress={() => {
              Dengage.promptForPushNotificationsWitCallback(
                async hasPermission => {
                  console.log('hasPermission: ' + hasPermission);
                  await Dengage.setUserPermission(Boolean(hasPermission));
                },
              );
            }}
            title={'ask Permission'}
          />
        </View>
      )}

      <View style={styles.btnContainer}>
        <Button
          onPress={async () => {
            const token = await Dengage.getToken();
            alert('token: ' + token);
          }}
          title={'get & show token'}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button
          onPress={async () => {
            alert('contactKey: ' + (await Dengage.getContactKey()));
          }}
          title={'show Contact Key'}
        />
      </View>

      <View style={styles.groupContainer}>
        <Text>Edit/Enter Contact Key to update:</Text>
        <TextInput
          value={contactKey}
          onChangeText={val => setContactKey(val)}
          style={styles.input}
        />

        <View style={styles.btnContainer}>
          <Button
            onPress={async () => {
              await Dengage.setContactKey(contactKey);
            }}
            title={'update Contact Key'}
          />
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button
          onPress={async () => {
            if (!subscription) {
              setSubscription(await Dengage.getSubscription());
            } else {
              toggleSubscription(!subscriptionHidden);
            }
          }}
          title={'Show/Hide Current Subscription'}
        />
        {!subscriptionHidden && <Text>{`subscription: ${subscription}`}</Text>}
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.btnContainer}>
          <Button
            onPress={async () => {
              const res = await Dengage.sendDeviceEvent('ky_device_event', {
                test_event: 'this is test device event.',
              });
            }}
            title={'send Device Event'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainerStyles: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    width: 250,
    borderColor: 'black',
  },
  btnContainer: {
    margin: 10,
  },
  groupContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
});
