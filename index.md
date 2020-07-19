# Intro

## Programming Languages
 Programming languages can seem very different from each other, just like spoken languages such as English or Dutch. But almost all are capable of writing any program or expressing any idea. 

 Programming languages differ in the rules that tell you how to write a program, just like different spoken languages have different rules for how you make a sentence. Some programming languages are similar to each other, just like Spanish and Italian are similar. Some have very few rules in common, just like English and Chinese. But these programming languages are all able to represent the ideas in your program. 

 The first language we will use is called *JavaScript*. In later courses we will introduce other programming languages. For example, *Solidity* is a language for writing *smart contracts* on the *Ethereum* blockchain. We will introduce different rules for writing your code, but the basic ideas you learn will stay the same across all languages.

## JavaScript
 We will use *JavaScript* as our programming language. Probably you have already heard of JavaScript before. It is both powerful, and easy to write. You don't need to know how to program. We will introduce JavaScript bit by bit over the next chapters, as we use it to build our blockchain.

 You will learn how to create *classes* in code which represent different things, such as a block on the blockchain. You will also learn how to create *functions*, which allow you to take actions in your code. Actions could be mining on the blockchain or calculating a hash.

## The blockchain
You are probably already familiar with the blockchain. We are going to go through the basic principles from the very beginning. Most of the terms we use you will have seen before. 

By the end, you will understand what makes blockchain technology unique. 

 - You will understand what the different components of a blockchain are and how they fit together. 
 - You will understand how hashing works. 
 - You will understand how different parameters, such as the difficulty level and the timestamp window, affect the security and performance of a blockchain.

And you will know how to write your own blockchain from scratch.

# Objects
 
## Creating a block in JavaScript
This is how you create an *object*. In JavaScript the technical name for this particular type of object is a `class`. We called our new type of object "Thing”.

Try changing the object so it's called a "Block".

```JavaScript
class Thing {}
```

## Adding fields to our block
When you create an object you can add *fields* to represent the different things an object contains. Each field has a *name* as well as a *type*. We have a block here which contains an object with the name "random". Try changing the name to "data".

```JavaScript
class Block {
  constructor() {
    this.random = ""
  }
}
```

# Hashing
## The SHA256 hash
Bitcoin uses a version of a hash called SHA256. 
On [this website](https://emn178.github.io/online-tools/sha256.html), you can put in different inputs and see their SHA256 hash.   

You will always get the same hash output for the same input. Go ahead and try it with:

  `Hello world`   

Did you get this output?

  `64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c`   

Make sure your capitalization is the same as the example input. Extra spaces will also give you a different hash output.

## Hashing for security
Often when websites store your password, they store the hash of your password. When you log in, they take the password you send and hash it. If it matches the hash they have stored, then the password is correct. If someone steals the hash, there is no way to use it to guess your password.

What if someone wants to break into your account. Can they guess the hash without knowing your password?

We know that entering your password will always produce the same hash. 

On average, an attacker will have to guess around 10<sup>36</sup> hashes before they will guess correctly. That is a 1 with 36 zeroes following it. 

That is a big number, but computers can guess really fast. Are they fast enough?

## Snowden uses hashes
When Edward Snowden first contacted journalist Glenn Greenwald, he told him their conversation was probably being listened to. He asked Mr. Greenwald to use a form of encryption based on hashes, and said they should assume their attacker was capable of one trillion guesses per second.

Of course, we know now that Snowden was talking about the NSA. So if they can guess one trillion times per second, how long would it take the NSA to guess an SHA256 hash?

Let's do the math.

## Cracking a hash
Figuring out our hash would take about 10<sup>36</sup> guessses. So a 1 with 36 zeroes after it. 

We assume our attacker is guessing at 1 trillion times per second, which is 10<sup>12</sup>.

10<sup>36</sup> guesses / 10<sup>12</sup> guesses per second = 10<sup>24</sup> seconds

It would take our attacker 10<sup>24</sup> seconds to guess our hash. That is about 10<sup>17</sup> years. 

Our universe is only around 10<sup>9</sup> years old. 

So nobody can crack our SHA256 hash. That's good to know.


# Back to blocks
## What is in a block?
Each block will contain 5 items.
 - timestamp
 - number of leading zero digits
 - *nonce*
 - hash of previous block
 - data

## The different types of fields
We will store time as Unix time, the number of seconds elapsed since January 1, 1970 UTC. It's common for computers to use this format.

We are using UTC time, which means the time will not depend on where you are located. 

January 1, 2020 in Unix format is `1577833200`.

## Our block object
Below is the structure of a block. In the next sections we will explain each part of the block in more detail. Some parts of the block should already look familiar. 

You've seen what a hash looks like in earlier sections. `previousHash` is the hash of the previous block in the chain. This gives us a unique, unbreakable link between this block and the one before it. We will spend more time discussing that later; it's important to the structure of the blockchain.

`nonce` stands for `Number used ONCE`; we will explore the purpose of the nonce in the section [mining blocks](#mining-blocks)

 `numberZeroes` is the number of leading digits that must equal zero, and is a measure of the current difficulty of mining. We will discuss that in the section [calculating hashes](#calculating-hashs)

 `data` represents the data we store in our blockchain. For Bitcoin, this would be transactions. For Ethereum, it might be data used by a smart contract. But we can use it to store anything we would like. For now, let's store an empty [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).


```JavaScript
class Block {
  /*
  *  This function constructs all the different parts of our block
  */
  constructor(previousHash) {
        this.previousHash = previousHash
        this.timestamp = Date.now() //unix time
        this.numberZeroes = 2
        this.nonce = 0
        this.data = []
    }
}
```

# Functions
### Define a function
Now we know how to create a *thing*, our `Block` object. What if you want to do something? Functions are used to perform an *action*. Here we define a function that says “Hello World!” It uses an existing function (`console.log()`) to print the output onto your screen.

```JavaScript
sayHello() {
  console.log(“Hello World”)
}
```

### Create a block
How about a function that really does something? Let’s write a function that creates a new Block object. First we define the function name. We *initialize* a new Block called `ourBlock` inside the function definition. Initialization is what it’s called when we create a new object.

```JavaScript
newBlock() {
  let ourBlock = new Block()
  return ourBlock
}
```
### Edit a block
How about a function that changes our existing block? First we define the function name. This function does an operation on an existing object, so we define function inside of our object. Then we can make changes to the object. When we want to use this function we can write `ourBlock.changeNonce(10)` to change the nonce of `ourBlock` to 10.

```JavaScript
class Block {
    constructor(previousHash) {
        this.previousHash = previousHash
        this.timestamp = Date.now() //unix time
        this.nonce = 0
        this.data = []
    }
    changeNonce(newNonce) {
        this.nonce = newNonce
    }
}
```

### Mining blocks
We saw before that each block contains a *nonce*, or Number used ONCE. When we hash the block, we end up with a random looking output. By changing the *nonce*, but nothing else, we can change what the hash looks like. In code it would look like this.

Change the nonce to 10:

```JavaScript
let previousHash = "64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c"
let ourBlock = Block(previousHash)
ourBlock.changeNonce(10)
console.log(ourBlock.hash())
```


### Calculating hashes
If we keep changing the *nonce* eventually we can get an output that starts with `0`. However, it takes us a number of tries to find a value that gives us that hash output. Each try takes a certain amount of time to compute. What if we want to find an output that starts with `00`? That takes us twice as long. If we want it to start with `000`  we need to try three times as many guesses. If we increase the numbers of zeroes at the beginning we can increase the difficulty of finding a correct nonce. That's how you mine a block!

### Increasing the difficulty
You saw how, as the number of leading zeroes increases, the numbers of guesses you have to make increases too. Remember, you have to do this for each block! By increasing the number of leading zeroes we can make it more and more time consuming to mine blockchain. Each time you increase the number the average time it takes to mine a block doubles.


# Adding functionality
### Compute our hash
We can use a *library* (code written by someone else) to compute the SHA256 hash. Here is an example below. First we import the library. Then we turn `this` (the block) into a string using our [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) function. Next we hash that string.  We can find documentation explaining how to use the `crypto` library [here](https://nodejs.org/api/crypto.html). The documentation shows us how to use the library and what functions it has available. We'll explore in further detail in the next section.

```JavaScript
const crypto = require('crypto');
class Block {
  hash() {
    const blockString = JSON.stringify(this)
        const hash = crypto.createHash('sha256').update(blockString).digest('hex');
        return hash
  }
}
```

# Getting down to business
Time to write some code yourself. In the next sections there will be screencasts showing you how to write each part of the blockchain. But first, we need to install some software.

1. [Install Visual Studio Code](https://code.visualstudio.com/Download)
2. [Install NodeJS](https://nodejs.org/en/download/)

## Create a block
[Screencast](https://www.youtube.com/watch?v=wWT1k2uQyBo)

We use a JavaScript library called [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) to create the timestamp. The function `Date.now()` gives us the current time in unix format, which is the number of seconds since January 1, 1970.

## Create a blockchain
[Screencast](https://www.youtube.com/watch?v=2GUZXhn21jM)

Here we will write the first parts of code that will define our blockchain. 

We set `this.blocks` to be an empty array. An [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) is just a list of items, in this case blocks.

We also write a function to create our *genesis block*. The genesis block is unique because it is the first block in the chain. That means it doesn't have a hash linking it to any other blocks.

## Organize our project
[Screencast](https://www.youtube.com/watch?v=oMQjz3VAY-A)

When we import a library we do it like this:
```JavaScript
const crypto = require('crypto')
```

Sometimes we want to import our own code. When we organize our project we will put the `Block` class inside it's own `block.js` file. Then we *export* it like this:

```JavaScript
modules.export.Block = Block
```

When we want to use it inside our `blockchain.js` file we *import* it like this:

```JavaScript
const { Block } = require('./block')
```

## Add a block to the chain
[Screencast](https://youtu.be/acJQ6MQIqkQ)

First we will add a function that calculates the hash of a block.
Then we will create a new block and link it to the hash of our genesis block.

We will create a function called `addBlock` in the `blockchain.js` file. 

Before we can add a block, we have to check whether it is correctly linked. We do that inside of our `addBlock` function. In JavaScript, when you want to check something you use an `if` statement. The `if` statement for checking whether our block is correctly linked is shown below:

```JavaScript
class Blockchain {
  addBlock(block) {
    if(block.previousHash === this.getLastBlock().hash()) {
        // here is where we add the block to the blockchain
    }
  }
}
```

## Mine blocks
[Screencast](https://youtu.be/YNyHPpdh0Kc)

First we will add a *nonce* to our block.

Now we can 'mine' a block by changing the nonce repeatedly until the hash of our block starts with '00'.
When we want to do something repeatedly in JavaScript we can use a `while` loop. The code below loops until the hash starts with '00'. Every time it loops it increments the nonce by one.

```JavaScript
class Block {
  mine() {
    let leadingZeroes = '00'
    let hashPrefix = this.hash().substring(0,2) // get first two numbers from hash string
    while (leadingZeroes !== hashPrefix) {
      this.nonce = this.nonce + 1
      hashPrefix = this.hash().substring(0,2)
    }
  }
}
```


In the screencast you will see me using google. I do this on purpose. Google should be the first resource you try. Just type in your question and add "JavaScript nodejs" to the end.

When I run into problems or have a "bug", I use `console.log` to print the output of my program to the terminal. This lets you see what is happening inside of your program. It can be a really valuable way of finding out what's going wrong. In the screencast I found out that my hash wasn't changing when I changed the nonce. When I changed the way I created the hash, it started changing. Turns out I needed to use `JSON.stringify(this)` instead of `this.toString()`. This is just a different way of making a block into a string which can then be hashed.

## Validate our chain
[Screencast](https://youtu.be/7rri7ZgLLqw)

First let's try changing the difficulty of our mining function. Every time we require an extra leading zero we (roughly) double the time it takes on average to mine a single block.

Now we can add a function to the `Blockchain` class that validates the chain by checking the link between each block and the previous block's hash.

Once we finish mining a block we can hash it. The hash of a block never changes. By including this hash in the next block we can link them together. Because the hash never changes this link will never change. If somebody tries to add an invalid block to our blockchain we will immediately know, since the hash won't match the previous block.

This means we have a tamper-proof link between each block in our chain. In order to change one block you have to go back and recompute the hash of every block. Because of our mining function recomputing the whole chain will be very slow.

We can loop through every block in our chain and check whether the field `previousHash` matches the hash of the previous block. This time we will use a `for` loop. The code for looping through the whole blockchain (starting at the *second* block) is shown below

```JavaScript
class Blockchain() {
  /*
  * This method will loop through every block starting at the second block and 
  * check whether the field `previousHash` equals the hash of the previous block
  */
  validateChain() {
    for(let i = 1; i<this.blocks.length; i++) {
      const previousBlock = this.blocks[i-1]
      const block = this.blocks[i]
      if (block.previousHash !== previousBlock.hash()) { // if these are *not* equal the chain is not valid
        return false
      }
    }
    return true // If we loop through all the blocks without returning false then the chain is valid
  }
}
```


##### @TODO: 



