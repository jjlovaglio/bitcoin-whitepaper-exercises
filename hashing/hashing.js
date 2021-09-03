var crypto = require("crypto");

GENESIS_BLOCK_HASH = "000000";

// The Power of a Smile
// by Tupac Shakur
const poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

const Blockchain = {
	blocks: [],
	addBlock(block) {
		this.blocks.push(block);
	},
	getBlocks() {
		return this.blocks;
	}
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: GENESIS_BLOCK_HASH,
	data: "",
	timestamp: Date.now(),
});

function generateHash({ prevHash, text, timestamp }) {
	return crypto.createHash('sha256').update(`${prevHash}${text}${timestamp}`).digest('hex');
}

function createBlock(text) {
	// block is an object
	// create a new block object
	// increment index
	// take the value of the previous hash and insert it into prevHash attribute
	// take the string data passed through the parameter insert it into data attribute
	// pass the fields index, prevHash, data, and timestamp into the sha 256 hashing algo
	// insert the output in the hash attribute
	// insert object into blocks array in Blockchain object
	const blockchainLength = Blockchain.blocks.length;
	const nextIndex = blockchainLength;
	const currBlock = Blockchain.blocks[Blockchain.blocks.length - 1];
	const timestamp = Date.now();

	return {
		index: nextIndex,
		prevHash: currBlock.hash,
		hash: generateHash({
			prevHash: currBlock.hash,
			text,
			timestamp
		}),
		data: text,
		timestamp: timestamp,
	}


}

function createChain() {
	// loop through poem array
	// 	create a block with proper information for each poem line
	// 	add each block to the Blockchain object

	poem.forEach((text) => {
		const block = createBlock(text);
		Blockchain.addBlock(block);
	});


}

/**
 * @name verifyBlock
 * @param block current block to check
 * @param prevBlock previous block to check against
 * @returns boolean
 * @description verifies a block based on the following conditions:
 * 	data must be non empty
 * 	hash must be "000000" for genesis block
 * 	prevHash must be non empty
 * 	index must be an integer >= 0
 * 	hash must match what recomputing the has with blockHash(...) produces
 */
function verifyBlock(block, prevBlock) {
	const {
		data,
		index,
		hash,
		prevHash,
		timestamp
	} = block;

	// check genesis block
	if (index === 0 ) {
		return hash === GENESIS_BLOCK_HASH;
	}

	// checks data is non empty
	const hasData = Boolean(data);

	// checks index is greater or equal to zero
	const correctIndex = index >= 0;

	// checks hash matches generated hash composed of prevHash, timestamp & text
	const hasMatches = hash === generateHash({
		prevHash: prevBlock.hash,
		text: data,
		timestamp
	});

	// check that previous block hash matches prevHash
	const hasChainMatched = prevBlock.hash === prevHash;

	return [hasData, correctIndex, hasMatches, hasChainMatched].every(val => val);

}

/**
 * @name verifyChain
 * @description - checks all blocks in the chain to ensure chain is valid
 */
function verifyChain() {
	const blocks = Blockchain.getBlocks();

	// Returns an array of true or false values based on outcome of block verification
	const blockVerifications = blocks.map((block, i) => verifyBlock(block, blocks[i-1]));

	return blockVerifications.every(val => val);
}


createChain();

// // Uncomment the following to test a broken chain (verifyChain fails) 
// Blockchain.addBlock({
// 	index: 5,
// 	hash: '1234456543453534543',
// 	prevHash: '823492375',
// 	data: '123123123',
// 	timestamp: Date.now(),
// });


console.log(`Blockchain is valid: ${verifyChain()}`);