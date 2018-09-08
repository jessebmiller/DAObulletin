const { getAllBulletins } = require('../src/lib')

// If we get a passed proposal from Alchemy with this description, we should
// consider the bulletin about the official animal posted

const mockServerProposals = [
  {
    description:
    'https://ipfs.infura.io/ipfs/QmXCgZtV4Mb78R5TAQDKXhHXzAdRhQkVL6WaUVuhKYLSRf'
  }, {
    description:
    'https://docs.google.com/document/d/1u4d5FZY2LWfw3yGtkCQp_qdrsSQ1g_foBW-Rsyiidqo/'
  }
]

const test = async () => {
  console.log(await getAllBulletins(mockServerProposals))
}

test()

