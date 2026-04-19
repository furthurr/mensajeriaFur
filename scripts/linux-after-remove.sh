#!/bin/bash
# Post-removal script for MensajeriaFur (.deb)
# Cleans up AppArmor profile and icons

# 1. Remove AppArmor profile
PROFILE="/etc/apparmor.d/mensajeriafur"
if [ -f "$PROFILE" ]; then
  apparmor_parser -R "$PROFILE" 2>/dev/null || true
  rm -f "$PROFILE"
fi

# 2. Remove icons from hicolor theme
rm -f /usr/share/icons/hicolor/16x16/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/32x32/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/48x48/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/64x64/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/128x128/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/256x256/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/512x512/apps/mensajeriafur.png
rm -f /usr/share/icons/hicolor/1024x1024/apps/mensajeriafur.png

# Update icon cache
if command -v gtk-update-icon-cache &> /dev/null; then
  gtk-update-icon-cache -f /usr/share/icons/hicolor 2>/dev/null || true
fi
