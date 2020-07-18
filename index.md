# Intro

## Programming Languages
 Programming languages can seem very different from each other, just like spoken languages such as English or Dutch. But almost all are capable of writing any program or expressing any idea. 

 Programming languages differ in the rules that tell you how to write a program, just like different spoken languages have different rules for how you make a sentence. Some programming languages are similar to each other, just like Spanish and Italian are similar. Some have very few rules in common, just like English and Chinese. But these programming languages are all able to represent the ideas in your program. 

 The first language we will use is called *Javascript*. In later courses we will introduce other programming languages. For example, *Solidity* is a language for writing *smart contracts* on the *Ethereum* blockchain. We will introduce different rules for writing your code, but the basic ideas you learn will stay the same across all languages.

## Javascript
 We will use *Javascript* as our programming language. Probably you have already heard of Javascript before. It is both powerful, and easy to write. You don't need to know how to program. We will introduce Javascript bit by bit over the next chapters, as we use it to build our blockchain.

 You will learn how to create *classes* in code which represent different things, such as a block on the blockchain. You will also learn how to create *functions*, which allow you to take actions in your code. Actions could be mining on the blockchain or calculating a hash.

## The blockchain
You are probably already familiar with the blockchain. We are going to go through the basic principles from the very beginning. Most of the terms we use you will have seen before. 

By the end, you will understand what makes blockchain technology unique. 

 - You will understand what the different components of a blockchain are and how they fit together. 
 - You will understand how hashing works. 
 - You will understand how hashing works. 
 - You will understand how different parameters, such as the difficulty level and the timestamp window, affect the security and performance of a blockchain.

And you will know how to write your own blockchain from scratch.

# Objects
 
## Creating a block in Javascript
This is how you create an *object*. In Javascript the technical name for this particular type of object is a "class". We called our new type of object "Thing”.

Try changing the object so it's called a "Block".

```Javascript
class Thing {}
```

## Adding fields to our block
When you create an object you can add *fields* to represent the different things an object contains. Each field has a *name* as well as a *type*. We have a block here which contains an object with the name "random" and the type "string". Try changing the name to "data".

```Javascript
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

Make sure your capitalization is the same as the example input.

## Hashing for security
Often when websites store your password, they store the hash of your password. When you log in, they take the password you send and hash it. If it matches the hash they have stored, then the password is correct. If someone steals the hash, there is no way to use it to guess your password.

What if someone wants to break into your account. Can they guess the hash without knowing your password?

We know that entering your password will always produce the same hash. 

On average, an attacker will have to guess around `10^36` hashes before they will guess correctly. That is a `1` with `36` zeroes following it. 

That is a big number, but computers can guess really fast. Are they fast enough?

## Snowden uses hashes
When Edward Snowden first contacted journalist Glenn Greenwald, he told him their conversation was probably being listened to. He asked Mr. Greenwald to use a form of encryption based on hashes, and said they should assume their attacker was capable of one trillion guesses per second.

Of course, we know now that Snowden was talking about the NSA. So if they can guess one trillion times per second, how long would it take the NSA to guess an SHA256 hash?

Let's do the math.

## Cracking a hash
Figuring out our hash would take about `10^36` guessses. So a `1` with `36` zeroes after it. 

We assume our attacker is guessing at `1 trillion` times per second, which is `10^12`.

`10^36 guesses / 10^12 guesses per second = 10^24 seconds`

It would take our attacker `10^24` seconds to guess our hash. That is about `10^17` years. 

Our universe is only around `10^9` years old. 

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
We will store time as Unix time, the number of seconds elapsed since January 1, 1970 UTC. We are using UTC time, which means the time does not depend on where you are located. 

January 1, 2020 in Unix format is: `1577833200`

## Our block object
This is the structure of a block. In the next sections we will explain each part of the block in more detail. Some parts of the block should already look familiar. 

You've seen what a hash looks like in earlier sections. `previousHash` is the hash of the previous block in the chain. This gives us a unique, unbreakable link between this block and the one before it. We will spend more time discussing that later; it's important to the structure of the blockchain.

`nonce` stands for `Number used ONCE`; we will explore the purpose of the nonce in the section [mining blocks](#mining-blocks)

 `difficulty` is the number of leading digits that must equal zero, and is a measure of the current difficulty of mining. We will discuss that in the section [calculating hashes](#calculating-hashs)

 `data` represents the data we store in our blockchain. For Bitcoin, this would be transactions. For Ethereum, it might be data used by a smart contract. But we can use it to store anything we would like. For now, let's store an empty [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).


```Javascript
class Block {
  constructor(previousHash) {
        this.previousHash = previousHash
        this.timestamp = Date.now() //unix time
        this.difficulty = 2
        this.nonce = 0
        this.data = []
    }
}
```

# Functions
### Define a function
Now we know how to create a *thing*, our “Block” object. What if you want to do something? Functions are used to perform an action. Here we define a function that says “Hello World!” It uses an existing function (`console.log()`) to *print* the output onto your screen.

```Javascript
sayHello() {
  console.log(“Hello World”)
}
```

### Create a block
How about a function that really does something? Let’s write a function that creates a new Block object. First we define the function name. We *initialize* a new Block called `ourBlock` inside the function definition. Initialization is what it’s called when we create a new object.

```Javascript
newBlock() {
  let ourBlock = new Block()
  return ourBlock
}
```
### Edit a block
How about a function that changes our existing block? First we define the function name. This function does an operation on an existing object, so we define the existing object before the function name. Then we can make changes to the object. When we want to use this function we can write `ourBlock.changeNonce(10)` to change the nonce of `ourBlock` to 10.

```Javascript
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

```Javascript
let previousHash = 1593849699
let ourBlock = Block(previousHash)
ourBlock.changeNonce(10)
console.log(ourBlock.hash())
```


### Calculating hashes
If we keep changing the *nonce* eventually we can get an output that starts with `0`. However, it takes us a number of tries to find a value that gives us that hash output. Each try takes a certain amount of time to compute. What if we want to find an output that starts with `00`? That takes us twice as long. If we want it to start with `000` now we need to try three times as many guesses. If we increase the numbers of zeroes at the beginning we can increase the difficulty of finding a correct nonce. That's how you mine a block!

### Increasing the difficulty
You saw how, as the number of leading zeroes increases, the numbers of guesses you have to make increases too. Remember, you have to do this for each block! By increasing the requirement for the number of leading zeroes we can make it more and more time consuming to mine blockchain. Let's write a *function* that automatically checks different values of the *nonce* for us.

Check whether a certain value of the nonce starts with the correct number of leading zeroes.

```Javascript
class Block {
  checkNonce() {
    return this.hash() <= this.difficulty
  }
}
```

# Adding functionality
### Compute our hash
We can use a *library* (code written by someone else) to compute the SHA256 hash. Here is an example below. First we import the library. Then we turn `this` (the block) into a string using our (`JSON.stringify` function)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify]. Next we hash that string.  We can find documentation explaining how to use the `crypto` library [here](https://nodejs.org/api/crypto.html). That shows us how to use the library and what functions it has available for us. We'll explore in further detail in the next section.

```Javascript
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
Time to write some code yourself. In the next sections there will be screencasts showing you how to write each part of the blockchain. But first we need to install some software:

1. [Install Visual Studio Code](https://code.visualstudio.com/Download)
2. [Install NodeJS](https://nodejs.org/en/download/)

## Create a block
[Screencast](https://www.youtube.com/watch?v=wWT1k2uQyBo)

## Create a blockchain
[Screencast](https://www.youtube.com/watch?v=2GUZXhn21jM)

## Organize our project
[Screencast](https://www.youtube.com/watch?v=oMQjz3VAY-A)

@TODO: 

How to check validity - explain how hashes link chains and are tamper-proof



