# quorumTemplate

1. git clone https://github.com/guptaritam/quorumTemplate.git
2. cd quorumTemplate
3. ./start.sh
4. ./geth attach ipc:./qdata/node1/geth.ipc
5. personal.unlockAccount("0xae1eac8646c2b43c93ab588492567da9d832415f","",0)
6. admin.startRPC("localhost", 8545,"*","db,eth,net,web3,admin,debug,miner,personal,ssh,txpool")
7. Ctrl A+D 
