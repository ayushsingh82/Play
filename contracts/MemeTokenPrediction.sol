// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeTokenPrediction is ReentrancyGuard, Ownable {
    struct Round {
        uint256 startTime;
        uint256 endTime;
        uint256[] initialPrices;
        uint256[] finalPrices;
        uint256 totalBets;
        uint256[] bucketTotalBets;
        bool resolved;
        mapping(address => Bet) bets;
    }

    struct Bet {
        uint256 amount;
        uint8 bucket;
        bool claimed;
    }

    uint256 public currentRoundId;
    uint256 public constant ROUND_LENGTH = 5 minutes;
    uint256 public constant BUCKET_COUNT = 4;
    
    mapping(uint256 => Round) public rounds;
    IERC20 public bettingToken;

    event BetPlaced(address indexed user, uint256 roundId, uint8 bucket, uint256 amount);
    event RoundResolved(uint256 indexed roundId, uint8 winningBucket);
    event RewardClaimed(address indexed user, uint256 roundId, uint256 amount);

    constructor(address _bettingToken) {
        bettingToken = IERC20(_bettingToken);
        startNewRound();
    }

    function placeBet(uint8 bucket, uint256 amount) external nonReentrant {
        require(bucket < BUCKET_COUNT, "Invalid bucket");
        require(amount > 0, "Bet amount must be greater than 0");
        
        Round storage round = rounds[currentRoundId];
        require(block.timestamp < round.endTime, "Round ended");
        
        bettingToken.transferFrom(msg.sender, address(this), amount);
        
        round.bets[msg.sender] = Bet(amount, bucket, false);
        round.bucketTotalBets[bucket] += amount;
        round.totalBets += amount;
        
        emit BetPlaced(msg.sender, currentRoundId, bucket, amount);
    }

    function resolveRound(uint256[] calldata finalPrices) external onlyOwner {
        Round storage round = rounds[currentRoundId];
        require(block.timestamp >= round.endTime, "Round not ended");
        require(!round.resolved, "Round already resolved");
        require(finalPrices.length == BUCKET_COUNT, "Invalid prices length");

        round.finalPrices = finalPrices;
        round.resolved = true;

        uint8 winningBucket = calculateWinningBucket(round.initialPrices, finalPrices);
        emit RoundResolved(currentRoundId, winningBucket);
        
        startNewRound();
    }

    function claimReward(uint256 roundId) external nonReentrant {
        Round storage round = rounds[roundId];
        require(round.resolved, "Round not resolved");
        
        Bet storage bet = round.bets[msg.sender];
        require(!bet.claimed, "Reward already claimed");
        require(bet.amount > 0, "No bet placed");

        uint8 winningBucket = calculateWinningBucket(round.initialPrices, round.finalPrices);
        require(bet.bucket == winningBucket, "Not a winning bet");

        uint256 reward = calculateReward(roundId, bet.amount);
        bet.claimed = true;
        
        bettingToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, roundId, reward);
    }

    function calculateReward(uint256 roundId, uint256 betAmount) public view returns (uint256) {
        Round storage round = rounds[roundId];
        uint8 winningBucket = calculateWinningBucket(round.initialPrices, round.finalPrices);
        return (betAmount * round.totalBets) / round.bucketTotalBets[winningBucket];
    }

    function calculateWinningBucket(uint256[] memory initialPrices, uint256[] memory finalPrices) 
        public 
        pure 
        returns (uint8) 
    {
        uint256 maxGain = 0;
        uint8 winningBucket = 0;

        for (uint8 i = 0; i < BUCKET_COUNT; i++) {
            uint256 gain = ((finalPrices[i] - initialPrices[i]) * 100) / initialPrices[i];
            if (gain > maxGain) {
                maxGain = gain;
                winningBucket = i;
            }
        }

        return winningBucket;
    }

    function startNewRound() private {
        currentRoundId++;
        Round storage newRound = rounds[currentRoundId];
        newRound.startTime = block.timestamp;
        newRound.endTime = block.timestamp + ROUND_LENGTH;
        newRound.bucketTotalBets = new uint256[](BUCKET_COUNT);
    }
} 