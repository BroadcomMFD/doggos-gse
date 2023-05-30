#!/bin/bash

LOCAL_DIR=/home/developer/doggos-gse/scripts/files

user=$(env | grep OWNER_EMAIL | sed 's/@.*//' | sed 's/^.*=//')
value="${user#mfwsuser}"
formatted_value=$(printf "%02d" $value)

USERN="CUST0$formatted_value"
LSTPRF="LSTPRF$formatted_value"
RUNDOG="RUNDOG$formatted_value"
DBGDOG="DBGDOG$formatted_value"

mkdir "$LOCAL_DIR/tmp"

sed "s|<USERN>|$USERN|g" "$LOCAL_DIR/jcl/DBGDOG.txt" > "$LOCAL_DIR/tmp/DBGDOG.txt"
sed -i "s|<DBGDOG>|$DBGDOG|g" "$LOCAL_DIR/tmp/DBGDOG.txt"

sed "s|<LSTPRF>|$LSTPRF|g" "$LOCAL_DIR/jcl/LSTPRF.txt" > "$LOCAL_DIR/tmp/LSTPRF.txt"

sed "s|<RUNDOG>|$RUNDOG|g" "$LOCAL_DIR/jcl/RUNDOG.txt" > "$LOCAL_DIR/tmp/RUNDOG.txt"

zowe files delete data-set "$USERN.PUBLIC.JCL" -f
zowe files delete data-set "$USERN.PUBLIC.INPUT" -f

zowe files cre pds "$USERN.PUBLIC.JCL"
zowe files ul dtp "$LOCAL_DIR/tmp" "$USERN.PUBLIC.JCL"
zowe files cre data-set-sequential "$USERN.PUBLIC.INPUT"
zowe files ul ftds "$LOCAL_DIR/DOGGOS.INPUT" $USERN.PUBLIC.INPUT