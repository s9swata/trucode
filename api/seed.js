const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Problem = require("./src/models/Problem");

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    acceptanceRate: 48.7,
    submissions: 2315421,
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    testCases: [
      { input: "2,7,11,15,9", expectedOutput: "0,1" },
      { input: "3,2,4,6", expectedOutput: "1,2" },
      { input: "3,3,6", expectedOutput: "0,1" },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating",
    difficulty: "Medium",
    tags: ["Hash Map", "String", "Sliding Window"],
    acceptanceRate: 35.2,
    submissions: 1824300,
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters.",
    ],
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" },
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptanceRate: 31.1,
    submissions: 984221,
    description: "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5" },
    ],
    constraints: [
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    testCases: [
      { input: "1,3,2", expectedOutput: "2.00" },
      { input: "1,2,3,4", expectedOutput: "2.50" },
    ],
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    acceptanceRate: 54.3,
    submissions: 1543210,
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area of water the container can contain is 49." },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4",
    ],
    testCases: [
      { input: "1,8,6,2,5,4,8,3,7", expectedOutput: "49" },
      { input: "1,1", expectedOutput: "1" },
    ],
  },
  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    acceptanceRate: 32.1,
    submissions: 2451001,
    description: "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5",
    ],
    testCases: [
      { input: "-1,0,1,2,-1,-4", expectedOutput: "[-1,-1,2]" },
      { input: "0,1,1", expectedOutput: "[]" },
    ],
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptanceRate: 46.5,
    submissions: 1342111,
    description: "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]." },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4",
    ],
    testCases: [
      { input: "1,3,2,6,8,10,15,18", expectedOutput: "1,6,8,10,15,18" },
    ],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    acceptanceRate: 40.3,
    submissions: 3125432,
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
    ],
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    acceptanceRate: 39.1,
    submissions: 1205432,
    description: "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (1 <= k < nums.length). Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
    ],
    testCases: [
      { input: "4,5,6,7,0,1,2,0", expectedOutput: "4" },
      { input: "4,5,6,7,0,1,2,3", expectedOutput: "-1" },
    ],
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptanceRate: 52.0,
    submissions: 2005121,
    description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top: 1. 1 step + 1 step. 2. 2 steps." },
      { input: "n = 3", output: "3" },
    ],
    constraints: ["1 <= n <= 45"],
    testCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
    ],
  },
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 73.1,
    submissions: 2891234,
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    testCases: [
      { input: "1,2,3,4,5", expectedOutput: "5,4,3,2,1" },
      { input: "1,2", expectedOutput: "2,1" },
    ],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    acceptanceRate: 50.1,
    submissions: 2654321,
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      { input: "-2,1,-3,4,-1,2,1,-5,4", expectedOutput: "6" },
      { input: "1", expectedOutput: "1" },
    ],
  },
  {
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree"],
    acceptanceRate: 31.8,
    submissions: 1452310,
    description: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key.",
    examples: [
      { input: "root = [2,1,3]", output: "true" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1",
    ],
    testCases: [
      { input: "2,1,3", expectedOutput: "true" },
      { input: "5,1,4,null,null,3,6", expectedOutput: "false" },
    ],
  },
  {
    title: "Word Search",
    slug: "word-search",
    difficulty: "Medium",
    tags: ["Array", "Backtracking", "Matrix"],
    acceptanceRate: 40.1,
    submissions: 1092341,
    description: "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.",
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
    ],
    testCases: [
      { input: "A,B,C,E,S,F,C,S,A,D,E,E,ABCCED", expectedOutput: "true" },
    ],
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    acceptanceRate: 59.2,
    submissions: 1456789,
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    testCases: [
      { input: "0,1,0,2,1,0,1,3,2,1,2,1", expectedOutput: "6" },
    ],
  },
  {
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "Medium",
    tags: ["Hash Map", "Linked List", "Design", "Doubly-Linked List"],
    acceptanceRate: 40.8,
    submissions: 1289123,
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    examples: [
      { input: '["LRUCache", "put", "put", "get", "put", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]', output: "[null, null, null, 1, null, -1]" },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
    ],
    testCases: [
      { input: "2,1,1,2,1,3,2", expectedOutput: "1,-1" },
    ],
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    acceptanceRate: 56.7,
    submissions: 2134567,
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.",
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
    ],
    constraints: [
      "m == grid.length",
      "n = grid[i].length",
      "1 <= m, n <= 300",
    ],
    testCases: [
      { input: "1,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,0,0", expectedOutput: "1" },
    ],
  },
  {
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    acceptanceRate: 45.4,
    submissions: 1345678,
    description: "There are a total of `numCourses` courses you have to take. Given an array of prerequisites, return true if you can finish all courses.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false" },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
    ],
    testCases: [
      { input: "2,1,0", expectedOutput: "true" },
      { input: "2,1,0,0,1", expectedOutput: "false" },
    ],
  },
  {
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    acceptanceRate: 75.4,
    submissions: 1987654,
    description: "Given the `root` of a binary tree, invert the tree, and return its root.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "root = [2,1,3]", output: "[2,3,1]" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100",
    ],
    testCases: [
      { input: "4,2,7,1,3,6,9", expectedOutput: "4,7,2,9,6,3,1" },
      { input: "2,1,3", expectedOutput: "2,3,1" },
    ],
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    acceptanceRate: 41.7,
    submissions: 1432198,
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3" },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    testCases: [
      { input: "1,2,5,11", expectedOutput: "3" },
      { input: "2,3", expectedOutput: "-1" },
    ],
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    acceptanceRate: 32.4,
    submissions: 2543109,
    description: "Given a string `s`, return the longest palindromic substring in `s`.",
    examples: [
      { input: 's = "babad"', output: '"bab"' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters.",
    ],
    testCases: [
      { input: "babad", expectedOutput: "bab" },
      { input: "cbbd", expectedOutput: "bb" },
    ],
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    tags: ["Array", "Hash Map", "String"],
    acceptanceRate: 66.8,
    submissions: 2001234,
    description: "Given an array of strings `strs`, group the anagrams together.",
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
    ],
    testCases: [
      { input: "eat,tea,tan,ate,nat,bat", expectedOutput: "bat,nat,tan,ate,eat,tea" },
    ],
  },
  {
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    difficulty: "Easy",
    tags: ["String"],
    acceptanceRate: 40.8,
    submissions: 2500000,
    description: "Write a function to find the longest common prefix string amongst an array of strings.",
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"' },
      { input: 'strs = ["dog","racecar","car"]', output: '""' },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
    ],
    testCases: [
      { input: "flower,flow,flight", expectedOutput: "fl" },
      { input: "dog,racecar,car", expectedOutput: "" },
    ],
  },
  {
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    tags: ["Hash Map", "String", "Sliding Window"],
    acceptanceRate: 41.0,
    submissions: 1100000,
    description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` is included in the window.",
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
    ],
    constraints: [
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters.",
    ],
    testCases: [
      { input: "ADOBECODEBANC,ABC", expectedOutput: "BANC" },
    ],
  },
  {
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    acceptanceRate: 38.6,
    submissions: 1400500,
    description: "You are given an integer array `nums`. You are initially positioned at the array's first index. Return `true` if you can reach the last index.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    testCases: [
      { input: "2,3,1,1,4", expectedOutput: "true" },
      { input: "3,2,1,0,4", expectedOutput: "false" },
    ],
  },
  {
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    tags: ["Array", "Hash Map", "Divide and Conquer", "Sorting", "Heap", "Bucket Sort"],
    acceptanceRate: 64.9,
    submissions: 1600200,
    description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "k is in the range [1, the number of unique elements].",
    ],
    testCases: [
      { input: "1,1,1,2,2,3,2", expectedOutput: "1,2" },
      { input: "1,1", expectedOutput: "1" },
    ],
  },
  {
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    acceptanceRate: 73.9,
    submissions: 2700000,
    description: "Given the `root` of a binary tree, return its maximum depth.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]", output: "2" },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100",
    ],
    testCases: [
      { input: "3,9,20,null,null,15,7", expectedOutput: "3" },
      { input: "1,null,2", expectedOutput: "2" },
    ],
  },
  {
    title: "Clone Graph",
    slug: "clone-graph",
    difficulty: "Medium",
    tags: ["Hash Map", "Depth-First Search", "Breadth-First Search", "Graph"],
    acceptanceRate: 53.2,
    submissions: 980000,
    description: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" },
    ],
    constraints: [
      "The number of nodes in the graph is between [0, 100].",
      "1 <= Node.val <= 100",
    ],
    testCases: [
      { input: "1,2,4,1,3,2,4,1,3", expectedOutput: "2,4,1,3,2,4,1,3" },
    ],
  },
  {
    title: "Permutations",
    slug: "permutations",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    acceptanceRate: 76.2,
    submissions: 1800000,
    description: "Given an array `nums` of distinct integers, return all the possible permutations.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
    ],
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
    ],
    testCases: [
      { input: "1,2,3", expectedOutput: "1,2,3,1,3,2,2,1,3,2,3,1,3,1,2,3,2,1" },
      { input: "0,1", expectedOutput: "0,1,1,0" },
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 62.8,
    submissions: 3200000,
    description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
    ],
    testCases: [
      { input: "1,2,4,1,3,4", expectedOutput: "1,1,2,3,4,4" },
      { input: ",", expectedOutput: "" },
    ],
  },
];

async function seed() {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL not set in .env");
    }
    
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");

    await Problem.deleteMany({});
    console.log("Cleared existing problems");

    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
