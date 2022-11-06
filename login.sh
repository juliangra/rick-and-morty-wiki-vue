#!/bin/bash

read -p "Enter student username: " username

ssh "$username@it2810-11.idi.ntnu.no"
