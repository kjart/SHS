#!/bin/bash

cd blockhain/workspace/raft
sudo apt-get update
sudo apt-get install libdb-dev libleveldb-dev libsodium-dev zlib1g-dev libtinfo-dev -y 
screen -d -m -S constellationNode bash -c './constellation-node constellation1.conf' 
screen -d -m -S quorumNode bash -c 'PRIVATE_CONFIG=constellation1.conf ./geth --datadir qdata/node1 --port 23000 --raftport 21000 --raft --ipcpath "./geth.ipc"' 
screen -d -m -S gethNode 
