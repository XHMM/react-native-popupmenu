import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  findNodeHandle,
} from 'react-native';
import React, { forwardRef } from 'react';
import type { MutableRefObject, PropsWithChildren } from 'react';

const LINKING_ERROR =
  `The package '@popupmenu/react-native-popup-menu' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type Action = { id: string; title: string };

export type PopupMenuProps = {
  actions: Array<Action>;
  onActionPress?: (event: { nativeEvent: { id: string } }) => void;
  style?: ViewStyle;
};

const ComponentName = 'PopupMenuView';
const RCTPopupMenuView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PopupMenuProps>(ComponentName)
    : null;
if (!RCTPopupMenuView) {
  throw new Error(LINKING_ERROR);
}

export const PopupMenu = forwardRef<any, PropsWithChildren<PopupMenuProps>>(
  (props, ref) => {
    return <RCTPopupMenuView {...props} ref={ref} />;
  }
);

export function showPopupMenu(
  popupMenuRef: MutableRefObject<any>,
  anchorRef: MutableRefObject<any>
) {
  const popNode = findNodeHandle(popupMenuRef.current);
  if (popNode === null) {
    console.error(
      `Cannot find PopupMenu node, did you forget to set ref to PopupMenu?`
    );
    return;
  }
  const anchorNode = findNodeHandle(anchorRef.current);
  if (anchorNode === null) {
    console.error(
      `Cannot find anchor node, did you forget to set ref to anchor?`
    );
    return;
  }
  UIManager.dispatchViewManagerCommand(popNode, 'show', [anchorNode]);
}
