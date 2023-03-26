#!/bin/bash
set -e
printf "\nConfiguring Zowe CLI...\n\n"
sed -i -e 's/TESTID##/${1}/g' zowe.config.json
sed -i -e 's/TESTID##/${1}/g' .vscode/tasks.json
# npx zowe config set profiles.lpar1.profiles.test4z.properties.hlq "$1"
# npx zowe config set profiles.lpar1.profiles.test4z.properties.user "$1"
# npx zowe config set profiles.lpar1.profiles.test4z.properties.password "$1"
# npx zowe config set profiles.lpar1.profiles.zosmf.properties.user "$1"
# npx zowe config set profiles.lpar1.profiles.zosmf.properties.password "$1"
# npx zowe config set profiles.lpar1.profiles.endevor.properties.user "$1"
# npx zowe config set profiles.lpar1.profiles.endevor.properties.password "$1"
printf "\n#### Zowe CLI configuration successful ####"
