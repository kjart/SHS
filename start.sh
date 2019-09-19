#!/bin/bash

cd blockhain/workspace/raft
sudo apt-get update
sudo apt-get install libdb-dev libleveldb-dev libsodium-dev zlib1g-dev libtinfo-dev -y 
cd /usr/lib/x86_64-linux-gnu
sudo mv libsodium.so ./libsodium.so.18
cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft
echo "...........starting constellationNode"
screen -d -m -S constellationNode bash -c './constellation-node constellation1.conf'
echo "...........exiting constellationNode"
cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft
sleep 10s
echo "...........starting quorumNode"
screen -d -m -S quorumNode bash -c 'PRIVATE_CONFIG=constellation1.conf ./geth --datadir qdata/node1 --port 23000 --raftport 21000 --raft --ipcpath ./geth.ipc'
echo "...........exiting quorumNode"
cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft
sleep 10s
echo "...........starting gethNode screen"
screen -S gethNode
./geth attach ipc:./qdata/node1/geth.ipc
