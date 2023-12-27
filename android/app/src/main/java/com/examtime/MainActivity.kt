package com.examtime

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash


import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    RNBootSplash.init(this, R.style.BootTheme) // ⬅️ initialize the splash screen
  }

   override fun getMainComponentName(): String = "ExamTime"
   
  /**  
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */   
    override fun createReactActivityDelegate(): ReactActivityDelegate =
     DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

}
