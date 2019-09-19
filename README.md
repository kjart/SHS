# quorumTemplate

1. git clone https://github.com/guptaritam/quorumTemplate.git
2. cd quorumTemplate
3. ./start.sh
4. screen -ls 

If you see only 1 screen after step 4, goto step 5, else skip to step 6

5. cd /home/ubuntu/quorumTemplate/blockhain/workspace/raft && screen -d -m -S quorumNode bash -c 'PRIVATE_CONFIG=constellation1.conf ./geth --datadir qdata/node1 --port 23000 --raftport 21000 --raft --ipcpath ./geth.ipc' 
6. screen -S gethNode
7. ./geth attach ipc:./qdata/node1/geth.ipc
8. personal.listAccounts
9. personal.unlockAccount("0xae1eac8646c2b43c93ab588492567da9d832415f","",0)
10. admin.startRPC("localhost", 8545,"*","db,eth,net,web3,admin,debug,miner,personal,ssh,txpool")
11. Ctrl A+D 
