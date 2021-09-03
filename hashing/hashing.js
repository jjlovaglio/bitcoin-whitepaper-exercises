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

function verifyBlock() {
	// check each block for:
	//		data being non empty
	//		genesis block hash for "00000"
	//		index for int >= 0
	//		hash match recomputing the hash with blockhash() 
	// verify blockchain has all 8 lines of the poem
	//		each as separate blocks
	//		total of 9 blocks, including genesis block

	
}

function verifyChain() {
	// check if all blocks are valid
	// returns true or false

}

// console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

// function blockHash(bl) {
// 	return crypto.createHash("sha256").update(
// 		// TODO: use block data to calculate hash
// 	).digest("hex");
// }

createChain();