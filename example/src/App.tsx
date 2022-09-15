import * as React from 'react';
import { useRef } from 'react';
import { Pressable, View, Text, ScrollView } from 'react-native';
import { PopupMenu, showPopupMenu } from '@popupmenu/react-native-popup-menu';

const ContentInPopupMenu = () => {
  const popRef = useRef<any>(null);
  const anchorRef = useRef<any>(null);
  return (
    <PopupMenu
      ref={popRef}
      onActionPress={(ev) => {
        console.log('action press:', ev.nativeEvent);
      }}
      actions={[
        { id: 'eat', title: 'go eating' },
        { id: 'drink', title: 'got drinking' },
      ]}
      style={{
        backgroundColor: 'pink',
        padding: 10,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>long press below</Text>
      <Pressable
        ref={anchorRef}
        onLongPress={() => {
          console.log('long press');
          showPopupMenu(popRef, anchorRef);
        }}
        onPress={() => {
          console.log('press can be triggered under PopupMenu');
        }}
        style={{
          width: 300,
          padding: 20,
          height: 100,
          backgroundColor: 'orange',
        }}
      />
    </PopupMenu>
  );
};

const ContentNotInPopupMenu = () => {
  const popRef = useRef<any>(null);
  const anchorRef = useRef<any>(null);
  return (
    <View
      style={{ backgroundColor: 'pink', padding: 10, flexDirection: 'row' }}
    >
      <Pressable
        style={{ width: 100, height: 100, backgroundColor: 'orange' }}
        onLongPress={() => {
          showPopupMenu(popRef, anchorRef);
        }}
      >
        <Text>long press me</Text>
      </Pressable>
      <PopupMenu
        ref={popRef}
        onActionPress={(ev) => {
          console.log('action press:', ev.nativeEvent);
        }}
        actions={[
          { id: 'a', title: 'title a' },
          { id: 'b', title: 'title b' },
        ]}
      >
        <Text style={{ marginLeft: 20 }} ref={anchorRef}>
          Popup menu will show here
        </Text>
      </PopupMenu>
    </View>
  );
};

const ScrollViewInPopupMenu = () => {
  const popRef = useRef<any>(null);
  const anchorRef = useRef<any>(null);
  return (
    <>
      <PopupMenu
        ref={popRef}
        actions={[{ title: 'item', id: 'id' }]}
        onActionPress={() => {}}
      >
        <ScrollView
          ref={anchorRef}
          horizontal
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'pink',
          }}
          contentContainerStyle={{ padding: 10, alignItems: 'center' }}
        >
          <Text
            style={{
              width: 200,
              height: 80,
              backgroundColor: 'orange',
              marginRight: 10,
            }}
          >
            scroll me
          </Text>
          <Pressable
            style={{ width: 80, height: 80, backgroundColor: 'purple' }}
            onPress={() => {
              showPopupMenu(popRef, anchorRef);
            }}
          >
            <Text>press me</Text>
          </Pressable>
        </ScrollView>
      </PopupMenu>
    </>
  );
};

export default function App() {
  return (
    <>
      <ContentInPopupMenu />
      <View style={{ height: 10 }} />
      <ContentNotInPopupMenu />
      <View style={{ height: 10 }} />
      <ScrollViewInPopupMenu />
    </>
  );
}
