import { ContractTransaction } from 'ethers';
import { Arrayish, BigNumber, BigNumberish, Interface } from 'ethers/utils';
import { EthersContractContext } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContext<
  ResultDapp,
  ResultDappEventsContext,
  ResultDappEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ResultDappEvents = undefined;
export interface ResultDappEventsContext {}
export type ResultDappMethodNames =
  | 'new'
  | 'addBatch'
  | 'addUser'
  | 'deleteUser'
  | 'editBatch'
  | 'getAllBatches'
  | 'getAllWhitelistedAddresses'
  | 'getBatch'
  | 'verifyStudentRecord'
  | 'verifyUser';
export interface BatchResponse {
  batchId: BigNumber;
  0: BigNumber;
  studentRecordsRoot: string;
  1: string;
  IPFSHash: string;
  2: string;
}
export interface ResultDapp {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _batchId Type: uint256, Indexed: false
   * @param _studentRecordsRoot Type: bytes32, Indexed: false
   * @param IPFSHash Type: string, Indexed: false
   */
  addBatch(
    _batchId: BigNumberish,
    _studentRecordsRoot: Arrayish,
    IPFSHash: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _addressToWhitelist Type: address, Indexed: false
   */
  addUser(
    _addressToWhitelist: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _addressToUnwhitelist Type: address, Indexed: false
   */
  deleteUser(
    _addressToUnwhitelist: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _batchId Type: uint256, Indexed: false
   * @param _newBatchRoot Type: bytes32, Indexed: false
   * @param IPFSHash Type: string, Indexed: false
   */
  editBatch(
    _batchId: BigNumberish,
    _newBatchRoot: Arrayish,
    IPFSHash: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllBatches(overrides?: ContractCallOverrides): Promise<BatchResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllWhitelistedAddresses(
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _batchId Type: uint256, Indexed: false
   */
  getBatch(
    _batchId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BatchResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _batchId Type: uint256, Indexed: false
   * @param _leaf Type: bytes32, Indexed: false
   * @param _proof Type: bytes32[], Indexed: false
   */
  verifyStudentRecord(
    _batchId: BigNumberish,
    _leaf: Arrayish,
    _proof: Arrayish[],
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  verifyUser(
    _address: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
