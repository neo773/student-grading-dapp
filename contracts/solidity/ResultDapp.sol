// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MerkleProof.sol";

contract ResultDapp {

    struct Batch {
        uint256 batchId;
        bytes32 studentRecordsRoot;
        string IPFSHash;
    }

    Batch[] private batches;
    mapping(uint256 => uint256) private batchIndex;
    address[] private whitelistedAddresses;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    modifier isWhitelisted(address _address) {
        require(
            verifyUser(_address) || _address == owner,
            "You need to be whitelisted"
        );
        _;
    }

    function addUser(address _addressToWhitelist) public onlyOwner {
        whitelistedAddresses.push(_addressToWhitelist);
    }

    function deleteUser(address _addressToUnwhitelist) public onlyOwner {
        for (uint256 i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _addressToUnwhitelist) {
                for (uint256 j = i; j < whitelistedAddresses.length - 1; j++) {
                    whitelistedAddresses[j] = whitelistedAddresses[j + 1];
                }
                whitelistedAddresses.pop();
                break;
            }
        }
    }

    function verifyUser(address _address) public view returns (bool) {
        if (_address == owner) return true;
        for (uint256 i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function getAllWhitelistedAddresses()
        public
        view
        returns (address[] memory)
    {
        return whitelistedAddresses;
    }

    function addBatch(
        uint256 _batchId,
        bytes32 _studentRecordsRoot,
        string memory IPFSHash
    ) public isWhitelisted(msg.sender) {
        require(batchIndex[_batchId] == 0, "Batch already exists");
        batches.push(Batch(_batchId, _studentRecordsRoot, IPFSHash));
        batchIndex[_batchId] = batches.length;
    }

    function editBatch(
        uint256 _batchId,
        bytes32 _newBatchRoot,
        string memory IPFSHash
    ) public isWhitelisted(msg.sender) {
        uint256 index = batchIndex[_batchId];
        require(index != 0, "Batch not found");
        batches[index - 1].studentRecordsRoot = _newBatchRoot;
        batches[index - 1].IPFSHash = IPFSHash;
    }

    function getBatch(uint256 _batchId) public view returns (Batch memory) {
        uint256 index = batchIndex[_batchId];
        require(index != 0, "Batch not found");
        return batches[index - 1];
    }

    function getAllBatches() public view returns (Batch[] memory) {
        return batches;
    }

    function verifyStudentRecord(
        uint256 _batchId,
        bytes32 _leaf,
        bytes32[] memory _proof
    ) public view returns (bool) {
        uint256 index = batchIndex[_batchId];
        require(index != 0, "Batch not found");
        return
            MerkleProof.verify(
                _proof,
                batches[index - 1].studentRecordsRoot,
                _leaf
            );
    }

}
