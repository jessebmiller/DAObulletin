.PHONY: eth-node
eth-node:
	docker run \
	   -d \
	   --rm \
	   --name eth-node \
	   --net host \
	   -v /Users/jesse/eth:/root \
                ethereum/client-go:alpine \
		--syncmode light \
		--rpcaddr 0.0.0.0 \
		--rpc \
		--rpcapi "db,eth,net,web3,personal,web3" \
	        --rpccorsdomain "*"
