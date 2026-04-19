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
# Note: explicit paths instead of loop variables to avoid electron-builder macro conflicts
install_icon() {
  S=$1
  SRC="/opt/MensajeriaFur/resources/app/build/icons/${S}x${S}.png"
  if [ ! -f "$SRC" ]; then
    SRC="/opt/MensajeriaFur/resources/build/icons/${S}x${S}.png"
  fi
  if [ ! -f "$SRC" ]; then
    SRC="/opt/MensajeriaFur/resources/app.asar.unpacked/build/icons/${S}x${S}.png"
  fi
  if [ -f "$SRC" ]; then
    DEST="/usr/share/icons/hicolor/${S}x${S}/apps"
    mkdir -p "$DEST"
    cp "$SRC" "$DEST/mensajeriafur.png"
  fi
}

install_icon 16
install_icon 32
install_icon 48
install_icon 64
install_icon 128
install_icon 256
install_icon 512
install_icon 1024

# Also copy the main icon as fallback
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
