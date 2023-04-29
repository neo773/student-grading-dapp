#!/bin/bash
declare -a providers=(web3 ethers)

for i in "${providers[@]}"
do
provider=$i  
output_dir="./contract-types/$i"

for filename in abi/*.json; do

pnpm exec abi-types-generator $filename --output=$output_dir --provider=$provider || continue

done

done