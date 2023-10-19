#!/bin/bash

# CHECK AND UNCOMMENT REMOTE_DIST_PATH
REMOTE_DIST_PATH="/intavia/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/"

# OPTIONAL: enable clean git check (you can set any confirmation phrase you want)
# CLEAN_GIT_CHECKWORD="<APPNAME>"



# check if REMOTE_DIST_PATH is set
if [ -z "$REMOTE_DIST_PATH" ]
then
    echo "Please set \$REMOTE_DIST_PATH"
    exit -1
fi



# check if REMOTE_DIST_PATH ends with "/dist/"
if [[ ! "$REMOTE_DIST_PATH" == */dist/ ]]
then
    echo "ATTENTION! \$REMOTE_DIST_PATH does not end with '/dist/'. Please check your \$REMOTE_DIST_PATH"
    exit -1
fi



# check if git status is clean
BLUE='\033[1;34m'
NC='\033[0m'
if [ ! -z "$CLEAN_GIT_CHECKWORD" ] && [ ! -z "$(git status --porcelain)" ]; then 

    echo -e "Git is not clean! Type ${BLUE}\"$CLEAN_GIT_CHECKWORD\"${NC} if you still want to deploy "
    read git_confirmation
    if [ ! "$git_confirmation" == "$CLEAN_GIT_CHECKWORD" ]; then
        exit -1
    fi

fi



# start time tracking
start=`date +%s`

# BUILDING THE APP
npm run build

build_end=`date +%s`
buildtime=$((build_end-start))
echo "-------------------------------------------------------"
echo "deploy.sh took $buildtime seconds for build the vue app"
echo "-------------------------------------------------------"

# COPY DIST FOLDER TO THE DESTINATION
rsync --exclude=.DS_Store --progress -rltDczh --delete ./dist/ root@2020.fluxguide.com:/root/www/fluxguide.com$REMOTE_DIST_PATH

end=`date +%s`
runtime=$((end-start))
echo "----------------------------------------------------"
echo "deploy.sh took $runtime seconds for build and upload"
echo "----------------------------------------------------"