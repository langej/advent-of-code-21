#! /bin/bash

day=$1

case $day in  
    "01")
        cd day-01 && clj -M main.clj && cd ..
        ;;
    "02")
        cd day-02 && node main.js && cd ..
        ;;
    *)
        echo "not yet.."
        ;;
esac