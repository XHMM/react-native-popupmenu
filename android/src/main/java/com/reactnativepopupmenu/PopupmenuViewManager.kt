package com.reactnativepopupmenu

import android.view.View
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.bridge.ReadableArray
import com.reactnativecontextmenu.PopupMenuView

class PopupMenuViewManager : ViewGroupManager<PopupMenuView>() {
    companion object {
      const val REACT_CLASS = "PopupMenuView"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    public override fun createViewInstance(reactContext: ThemedReactContext): PopupMenuView {
        return PopupMenuView(reactContext)
    }

    @ReactProp(name = "actions")
    fun setActions(view: PopupMenuView, actions: ReadableArray?) {
        view.setActions(actions)
    }

    override fun receiveCommand(root: PopupMenuView, commandId: String, args: ReadableArray?) {
      when(commandId) {
        "show" -> {
          val nodeId = args?.getInt(0) ?: return;
          val child: View? = root.findViewById(nodeId) ?: root.rootView.findViewById(nodeId)
          if (child != null) {
            root.showMenu(child)
          }
        }
      }
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return mapOf(
                "actionPress" to
                mapOf(
                        "phasedRegistrationNames" to
                        mapOf("bubbled" to "onActionPress")
                )
        )
    }
}
