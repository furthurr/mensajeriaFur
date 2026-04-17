#!/bin/bash
# Post-removal script for MensajeriaFur (.deb)
# Cleans up AppArmor profile

PROFILE="/etc/apparmor.d/mensajeriafur"

if [ -f "$PROFILE" ]; then
  rm -f "$PROFILE"
  if command -v apparmor_parser &> /dev/null; then
    apparmor_parser -R "$PROFILE" 2>/dev/null || true
  fi
fi
