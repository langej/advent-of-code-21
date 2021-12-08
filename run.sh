#! /bin/bash

day=$1

case $day in  
    "01")
        cd day-01 && clj -M main.clj && cd ..
        ;;
    "02")
        cd day-02 && node main.js && cd ..
        ;;
    "03")
        cd day-03 && node main.js && cd ..
        ;;
    "04")
        cd day-04 && node main.mjs && cd ..
        ;;
    "05")
        cd day-05 && node main.mjs && cd ..
        ;;
    "06")
        cd day-06 && node part2.mjs && cd ..
        ;;
    "07")
        cd day-07 && node main.mjs && cd ..
        ;;
    *)
        echo "not yet.."
        ;;
esac