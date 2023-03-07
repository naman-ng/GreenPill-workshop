export const contract_address = "0xE1aF4A77f2bfEA3fd90f28CD7A9e751FFd5b7a30";
export const contract_ABI = [
  {
    "type": "function",
    "name": "createOrganization",
    "inputs": [
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_target",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_image",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donateToOrganization",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getOrganizations",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "owner",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "target",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "amountCollected",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "image",
            "internalType": "string"
          }
        ],
        "internalType": "struct Donation.Organization[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "numberOfOrganizations",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "organizations",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "id",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "owner",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "target",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "amountCollected",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "image",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  }
];