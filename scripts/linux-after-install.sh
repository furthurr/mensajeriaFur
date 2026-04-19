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
# Run external script to avoid electron-builder macro conflicts with shell variables
if [ -f "/opt/MensajeriaFur/install-icons.sh" ]; then
  bash /opt/MensajeriaFur/install-icons.sh install
fi

# Update icon cache
if command -v gtk-update-icon-cache &> /dev/null; then
  gtk-update-icon-cache -f /usr/share/icons/hicolor 2>/dev/null || true
fi

# Update desktop database
if command -v update-desktop-database &> /dev/null; then
  update-desktop-database /usr/share/applications 2>/dev/null || true
fi
