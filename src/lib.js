import IPFS from 'ipfs-api'
const isIpfs = require('is-ipfs')
const { URL } = require('url')

console.log("connecting to IPFS")
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const getBulletin = async (proposal) => {
  // the v0-alpha protocol requires that the description is an ipfs URL
  if (!isIpfs.ipfsUrl(proposal.description)) {
    console.log(proposal.description, "is not an ipfs url")
    return null
  }

  // the v0-alpha protocol requires that the content is JSON with keys
  // "DAObulletinVersion" of "v0-alpha", and "bulletin" of type String
  let content = {}
  try {
    const ipfsUrl = new URL(proposal.description)
    content = (await ipfs.get(ipfsUrl.pathname))[0].content
    content = JSON.parse(content)
  } catch(e) {
    console.log("could not get json content from", proposal.description, e)
    // could not get json content
    return null
  }
  if (!content.DAObulletinVersion === "v0-alpha") {
    console.log(
      "Expected DAObulletinVersion v0-alpha, got",
      content.DAObulletinVersion
    )
    return null
  }
  if (!(typeof content.bulletin === 'string' ||
        content.bulletin instanceof String)) {
    console.log(
      "Expected bulletin to be a String, got",
      typeof content.bulletin
    )
    return null
  }
  return content.bulletin
}

export const getAllBulletins = async (proposals, notifier) => {
  const allBulletins = (await Promise.all(proposals.map(getBulletin))).filter(x => x)
  notifier(`found ${allBulletins.length} bulletins in ${proposals.length} proposals`)
  return allBulletins
}

