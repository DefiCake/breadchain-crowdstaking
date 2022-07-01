import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import config from "../config";
import { useNetwork, useProvider } from "wagmi";

const MULTISIG_ADDRESS = "0x6A148b997e6651237F2fCfc9E30330a6480519f0";

export const getMultisigDAIBalance = async (
  // account: string,
  network: ENetwork
): Promise<null | {
  balance: string;
}> => {
  const provider = useProvider();
  const { activeChain } = useNetwork();

  if (!activeChain || activeChain.unsupported) return null;

  const { DAI } = config[activeChain.id];

  const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  let balance = await DAIcontract.balanceOf(MULTISIG_ADDRESS);

  balance = ethers.utils.formatUnits(balance);

  // const BREADBalance = ethers.utils
  //   .formatUnits(BREADBal, BREAD.decimals)
  //   .toString();
  // const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  // const MATICBalance = ethers.utils.formatEther(MATICBal);

  return {
    balance,
  };
};

export default getMultisigDAIBalance;
