# DAObulletin [WIP]

A distributed system for viewing DAO bulletins

## How to propose a valid DAObulletin

1. Put a JSON object with `{"DAObulletinVersion": "0-alpha", "bulletin": "<your text>"}` on ipfs

2. Make a proposal in alchemy using the ipfs URL

If it passes DAObulletin will display it.

# Usage

`$ node src/index.js`
