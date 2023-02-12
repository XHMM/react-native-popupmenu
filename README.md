# React-Native-PopupMenu
Provide a imperative api for showing popup menu


## Why this?
Although there are repos have implemented native popup menu for android ([@react-native-menu/menu](https://github.com/react-native-menu/menu),  [react-native-context-menu-view](https://github.com/mpiannucci/react-native-context-menu-view)), they **didn't solve the issue when pressable component as the children of popup menu, pressing will not be triggered**, using api to control showing seems more flexible.

This repo didn't provide ios implementation, because ios doesn't have above issue, but if someone has this requirement, PR or issue is welcome.



## Install

```sh
yarn add @popupmenu/react-native-popup-menu
```
or
```sh
npm i @popupmenu/react-native-popup-menu
```

no linking required when using react-native 0.60+

## Example

```js
import * as React from 'react';
import { useRef } from 'react';
import { Pressable, View, Text } from 'react-native';
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

```

## API
### PopupMenu
#### props
##### `actions`:
```ts
Array<{ id: string; title: string }>
```
##### `onActionPress`:
```ts
(event: { nativeEvent: { id: string } }) => void;
```
### showPopupMenu
Call this method to programmatically show popup menu
```ts
(
  // shoud be the ref of PopupMenu
  popupMenuRef: MutableRefObject<typeof PopupMenu>,
  // popup menu will show besides this ref component
  anchorRef: MutableRefObject<any>
) => void
```


## License

MIT
