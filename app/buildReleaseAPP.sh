#!/bin/bash

export PATH=$PATH:/usr/local/android-sdk
export PATH=$PATH:/usr/local/android-sdk/tools
export PATH=$PATH:/usr/local/android-sdk/tools/bin
export PATH=$PATH:/usr/local/android-sdk/platform-tools
export PATH=$PATH:/usr/local/android-sdk/build-tools
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_131/
export ANDROID_HOME=/usr/local/android-sdk/

cd "${0%/*}"

./buildHTML.sh buildAPP

rm autocosts/platforms/android/build/outputs/apk/*

cd autocosts/
cordova build --release android

cp autocosts.keystore platforms/android/build/outputs/apk/
cd platforms/android/build/outputs/apk/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore autocosts.keystore android-release-unsigned.apk autocosts

zipalign -v 4 android-release-unsigned.apk autocosts.apk

rm /home/jfolpf/autocosts.apk
cp ./autocosts.apk /home/jfolpf/


