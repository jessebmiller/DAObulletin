import * as Arc from '@daostack/arc.js'
import axios from 'axios'
import { getAllBulletins } from './lib.js'

const fromBlock = 0
const toBlock = "latest"
const apiURL = "https://daostack-alchemy.herokuapp.com"
// const avatarAddress = "0xa3f5411cfc9eee0dd108bf0d07433b6dd99037f1"

const getServerExecutedProposals = async (avatarAddress, notifier) => {

  notifier("initializing arc.js")
  await Arc.InitializeArcJs()

  notifier("instantiating the DAO")
  const dao = await Arc.DAO.at(avatarAddress)

  // Put the name of the DAO on the page
  dao.avatar.orgName().then((name) => {
    const pageTitleElement = document.createElement("h1")
    pageTitleElement.appendChild(
      document.createTextNode(`${web3.toUtf8(name, 'hex')} Bulletins`)
    )
    document.getElementById("app").prepend(pageTitleElement)
  })

  notifier("getting contribution reward instance")
  const contributionRewardInstance = await Arc.ContributionRewardFactory.deployed();

  notifier("getting executed proposals, this can take a while")
  const executedProposals = await (
    await contributionRewardInstance.getExecutedProposals(
      dao.avatar.address))({}, { fromBlock, toBlock }).get();

  notifier("getting server proposals")
  const filter = `{"where":{"daoAvatarAddress":"${avatarAddress}"}}`
  const results = await axios.get(`${apiURL}/api/proposals?filter=${filter}`)

  notifier("filtering for executed proposals")
  const serverExecutedProposals = []
  results.data.forEach(r => {
    executedProposals.forEach(e => {
      // !!! on the server arcId matches proposalId from the contract
      // is there hash confirmation that the server isn't lying?
      if (r.arcId === e.proposalId) {
        serverExecutedProposals.push(r)
      }
    })
  })

  notifier(`found ${serverExecutedProposals.length} executed proposals.`)
  return serverExecutedProposals
}

const simpleNotifier = (message) => {
  const messageId = "simpleNotifier-messages"
  const messageNode = document.getElementById(messageId) ||
        document.createElement("div")
  messageNode.id = messageId

  while(messageNode.firstChild) {
    messageNode.removeChild(messageNode.firstChild)
  }

  messageNode.appendChild(
    document.createTextNode(message)
  )

  document.getElementById("app").appendChild(messageNode)
}

const main = async () => {
  const serverExecutedProposals = await getServerExecutedProposals(
    window.location.pathname.split('/')[1],
    (message) => {
      console.log(message)
      simpleNotifier(message)
    }
  )
  const executedBulletins = await getAllBulletins(
    serverExecutedProposals,
    (message) => {
      console.log(message)
      simpleNotifier(message)
    }
  )

  console.log(executedBulletins)
}

main()
