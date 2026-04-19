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
for size in 16 32 48 64 128 256 512 1024; do
  rm -f "/usr/share/icons/hicolor/${size}x${size}/apps/mensajeriafur.png"
done

# Update icon cache
if command -v gtk-update-icon-cache &> /dev/null; then
  gtk-update-icon-cache -f /usr/share/icons/hicolor 2>/dev/null || true
fi
