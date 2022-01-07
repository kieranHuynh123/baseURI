import dotenv from "dotenv";
dotenv.config();

const { ETHER_MAINNET, RINKEBY_NET } = process.env;

export const getChainId = (id: number) => {
    let network;
    switch(id) {
        case id = 1:
            network = ETHER_MAINNET;    
        case id = 4:
            network = RINKEBY_NET;
    }
    return network;
}

