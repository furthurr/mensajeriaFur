#!/bin/bash
# Post-installation script for MensajeriaFur (.deb)
# Fixes chrome-sandbox SUID permissions, installs AppArmor profile and icons

# 1. Fix chrome-sandbox SUID permissions (required for Chromium sandbox)
SANDBOX="/opt/MensajeriaFur/chrome-sandbox"
if [ -f "$SANDBOX" ]; then
  chown root:root "$SANDBOX"
  chmod 4755 "$SANDBOX"
fi

# 2. Install AppArmor profile (required for Ubuntu 24.04+ user namespace restrictions)
PROFILE_SRC="/opt/MensajeriaFur/apparmor-profile"
PROFILE_DST="/etc/apparmor.d/mensajeriafur"

if [ -f "$PROFILE_SRC" ]; then
  cp "$PROFILE_SRC" "$PROFILE_DST"
  if command -v apparmor_parser &> /dev/null; then
    apparmor_parser -r "$PROFILE_DST" 2>/dev/null || true
  fi
fi

# 3. Install icons in hicolor theme for proper desktop integration
ICON_SRC="/opt/MensajeriaFur/resources/app/build/icons"
if [ ! -d "$ICON_SRC" ]; then
  ICON_SRC="/opt/MensajeriaFur/resources/build/icons"
fi

for size in 16 32 48 64 128 256 512 1024; do
  ICON_FILE=""
  if [ -f "$ICON_SRC/${size}x${size}.png" ]; then
    ICON_FILE="$ICON_SRC/${size}x${size}.png"
  elif [ -f "/opt/MensajeriaFur/resources/app.asar.unpacked/build/icons/${size}x${size}.png" ]; then
    ICON_FILE="/opt/MensajeriaFur/resources/app.asar.unpacked/build/icons/${size}x${size}.png"
  fi

  if [ -n "$ICON_FILE" ]; then
    DEST_DIR="/usr/share/icons/hicolor/${size}x${size}/apps"
    mkdir -p "$DEST_DIR"
    cp "$ICON_FILE" "$DEST_DIR/mensajeriafur.png"
  fi
done

# Also copy the largest icon as the main app icon
if [ -f "/opt/MensajeriaFur/icono.png" ]; then
  mkdir -p /usr/share/icons/hicolor/256x256/apps
  cp /opt/MensajeriaFur/icono.png /usr/share/icons/hicolor/256x256/apps/mensajeriafur.png 2>/dev/null || true
fi

# Update icon cache
if command -v gtk-update-icon-cache &> /dev/null; then
  gtk-update-icon-cache -f /usr/share/icons/hicolor 2>/dev/null || true
fi

# Update desktop database
if command -v update-desktop-database &> /dev/null; then
  update-desktop-database /usr/share/applications 2>/dev/null || true
fi
