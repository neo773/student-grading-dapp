import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  ResultDapp,
  ResultDappMethodNames,
  ResultDappEventsContext,
  ResultDappEvents
>;
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
  batchId: string;
  studentRecordsRoot: string;
  IPFSHash: string;
}
export interface ResultDapp {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
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
    _batchId: string,
    _studentRecordsRoot: string | number[],
    IPFSHash: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _addressToWhitelist Type: address, Indexed: false
   */
  addUser(_addressToWhitelist: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _addressToUnwhitelist Type: address, Indexed: false
   */
  deleteUser(_addressToUnwhitelist: string): MethodReturnContext;
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
    _batchId: string,
    _newBatchRoot: string | number[],
    IPFSHash: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllBatches(): MethodConstantReturnContext<BatchResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllWhitelistedAddresses(): MethodConstantReturnContext<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _batchId Type: uint256, Indexed: false
   */
  getBatch(_batchId: string): MethodConstantReturnContext<BatchResponse>;
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
    _batchId: string,
    _leaf: string | number[],
    _proof: string | number[][]
  ): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _address Type: address, Indexed: false
   */
  verifyUser(_address: string): MethodConstantReturnContext<boolean>;
}
