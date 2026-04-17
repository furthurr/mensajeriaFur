#!/bin/bash
# Post-installation script for MensajeriaFur (.deb)
# Fixes chrome-sandbox SUID permissions and installs AppArmor profile

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
