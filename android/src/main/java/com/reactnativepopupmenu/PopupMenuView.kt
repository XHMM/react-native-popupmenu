package com.reactnativecontextmenu

import android.content.Context
import android.view.Menu
import com.facebook.react.views.view.ReactViewGroup
import android.view.View
import android.widget.PopupMenu
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.events.RCTEventEmitter

class PopupMenuView(context: Context) : ReactViewGroup(context) {
    var mContextMenu: PopupMenu? = null
    var mActions: ReadableArray? = null

    fun showMenu(view: View?) {
      mContextMenu = PopupMenu(context, view)

      val contextMenu = mContextMenu ?: return
      val actions = mActions ?: return

      for(index in 0 until actions.size()) {
        val item = actions.getMap(index)
        contextMenu.menu.add(Menu.NONE, index, Menu.NONE, item.getString("title"))
      }

      contextMenu.setOnMenuItemClickListener {
        val event = Arguments.createMap().apply {
          val itemId = it.itemId;
          putString("id", actions.getMap(itemId).getString("id"))
        }
        val reactContext = context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(id, "actionPress", event)
        true
      }

      mContextMenu!!.show()
    }

    fun setActions(actions: ReadableArray?) {
      mActions = actions
    }

}
