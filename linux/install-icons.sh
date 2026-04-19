#!/bin/bash
# Icon installer for MensajeriaFur
# Called from after-install and after-remove scripts
# Kept separate to avoid electron-builder macro expansion on shell variables

ACTION="$1"
APP_DIR="/opt/MensajeriaFur"
ICON_NAME="mensajeriafur"
SIZES="16 32 48 64 128 256 512 1024"

if [ "$ACTION" = "install" ]; then
  for S in $SIZES; do
    SRC=""
    for DIR in "$APP_DIR/resources/app/build/icons" "$APP_DIR/resources/build/icons" "$APP_DIR/resources/app.asar.unpacked/build/icons"; do
      if [ -f "$DIR/${S}x${S}.png" ]; then
        SRC="$DIR/${S}x${S}.png"
        break
      fi
    done
    if [ -n "$SRC" ]; then
      DEST="/usr/share/icons/hicolor/${S}x${S}/apps"
      mkdir -p "$DEST"
      cp "$SRC" "$DEST/${ICON_NAME}.png"
    fi
  done
  # Fallback: copy main icon
  if [ -f "$APP_DIR/icono.png" ]; then
    mkdir -p /usr/share/icons/hicolor/256x256/apps
    cp "$APP_DIR/icono.png" "/usr/share/icons/hicolor/256x256/apps/${ICON_NAME}.png" 2>/dev/null || true
  fi

elif [ "$ACTION" = "remove" ]; then
  for S in $SIZES; do
    rm -f "/usr/share/icons/hicolor/${S}x${S}/apps/${ICON_NAME}.png"
  done
fi
