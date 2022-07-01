import { ethers } from "ethers";
import { ENetwork } from "../features/network/networkSlice";

import ERC20abi from "../ERC20.json";
import BREADabi from "../BreadPolygon.json";
import config from "../config";
import { useNetwork, useProvider } from "wagmi";

export const getYieldAccrued = async (
  // account: string,
  network: ENetwork
): Promise<null | {
  yieldAccrued: string;
}> => {
  const provider = useProvider();
  const { activeChain } = useNetwork();

  if (!activeChain || activeChain.unsupported) return null;

  const { BREAD } = config[activeChain.id];

  const BREADcontract = new ethers.Contract(
    BREAD.address,
    BREADabi.abi,
    provider
  );
  // const DAIcontract = new ethers.Contract(DAI.address, ERC20abi, provider);

  let yieldAccrued = await BREADcontract.yieldAccrued();
  console.log("yieldAccrued raw value: ", yieldAccrued);

  const yieldAccruedFormatted = ethers.utils.formatUnits(yieldAccrued);

  // const BREADBalance = ethers.utils
  //   .formatUnits(BREADBal, BREAD.decimals)
  //   .toString();
  // const DAIBalance = ethers.utils.formatUnits(DAIBal, DAI.decimals).toString();
  // const MATICBalance = ethers.utils.formatEther(MATICBal);

  return {
    yieldAccrued: yieldAccruedFormatted,
  };
};

export default getYieldAccrued;
