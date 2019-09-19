#!/bin/bash

cd blockhain/workspace/raft
sudo apt-get update
sudo apt-get install libdb-dev libleveldb-dev libsodium-dev zlib1g-dev libtinfo-dev -y 
cd /usr/lib/x86_64-linux-gnu
sudo mv libsodium.so ./libsodium.so.18
cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft
screen -d -m -S constellationNode bash -c './constellation-node constellation1.conf'
screen -d -m -S quorumNode bash -c 'PRIVATE_CONFIG=constellation1.conf ./geth --datadir qdata/node1 --port 23000 --raftport 21000 --raft --ipcpath ./geth.ipc'
screen -d -m -S gethNode
cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft 
