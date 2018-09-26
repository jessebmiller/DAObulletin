# DAObulletin [WIP]

A distributed system for viewing DAO bulletins

## How to propose a valid DAObulletin

1. Put a JSON object with `{"DAObulletinVersion": "v0-alpha", "bulletin": "<your text>"}` on ipfs

2. Make a proposal in alchemy using it's ipfs URL

If it passes DAObulletin will display it.

# Usage

```
$ git clone https://github.com/jessebmiller/DAObulletin.git
$ cd DAObulletin
$ npm run dev
```

then open `localhost:8080/0xa3f5411cfc9eee0dd108bf0d07433b6dd99037f1` in a browser
