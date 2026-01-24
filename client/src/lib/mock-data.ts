export type Difficulty = "Easy" | "Medium" | "Hard";
export type SubmissionStatus = "Accepted" | "Wrong Answer" | "Time Limit";
export type Language = "TypeScript" | "Python" | "Go" | "Rust";

export type Problem = {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  acceptanceRate: number;
  submissions: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
};

export type Submission = {
  id: string;
  problemId: string;
  problemTitle: string;
  language: Language;
  status: SubmissionStatus;
  runtimeMs: number;
  memoryMb: number;
  submittedAt: string;
};

export type Discussion = {
  id: string;
  problemId: string;
  title: string;
  author: string;
  createdAt: string;
  replies: number;
  likes: number;
  tags: string[];
};

export const problems: Problem[] = [
  {
    id: "p-001",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    acceptanceRate: 48.7,
    submissions: 2315421,
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
  },
  {
    id: "p-002",
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Map", "String", "Sliding Window"],
    acceptanceRate: 35.2,
    submissions: 1824300,
    description:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters.",
    ],
  },
  {
    id: "p-003",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptanceRate: 31.1,
    submissions: 984221,
    description:
      "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
      },
    ],
    constraints: [
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
  },
  {
    id: "p-004",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    acceptanceRate: 54.3,
    submissions: 1543210,
    description:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4",
    ],
  },
  {
    id: "p-005",
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    acceptanceRate: 32.1,
    submissions: 2451001,
    description:
      "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
      },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
  },
  {
    id: "p-006",
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    tags: ["Array", "Sorting"],
    acceptanceRate: 46.5,
    submissions: 1342111,
    description:
      "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation:
          "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4",
    ],
  },
  {
    id: "p-007",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    acceptanceRate: 40.3,
    submissions: 3125432,
    description:
      "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
  },
  {
    id: "p-008",
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    tags: ["Array", "Binary Search"],
    acceptanceRate: 39.1,
    submissions: 1205432,
    description:
      "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (1 <= k < nums.length). Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums`.",
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
      },
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
    ],
  },
  {
    id: "p-009",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptanceRate: 52.0,
    submissions: 2005121,
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: 1. 1 step + 1 step. 2. 2 steps.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: 1+1+1, 1+2, 2+1.",
      },
    ],
    constraints: ["1 <= n <= 45"],
  },
  {
    id: "p-010",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 73.1,
    submissions: 2891234,
    description:
      "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
      },
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
  },
  {
    id: "p-011",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    acceptanceRate: 50.1,
    submissions: 2654321,
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
  },
  {
    id: "p-012",
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    tags: ["Tree", "Depth-First Search", "Binary Search Tree"],
    acceptanceRate: 31.8,
    submissions: 1452310,
    description:
      "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation:
          "The root node's value is 5 but its right child's value is 4.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1",
    ],
  },
  {
    id: "p-013",
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    tags: ["Array", "Backtracking", "Matrix"],
    acceptanceRate: 40.1,
    submissions: 1092341,
    description:
      "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    examples: [
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
      },
      {
        input:
          'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
      },
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters.",
    ],
  },
  {
    id: "p-014",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    acceptanceRate: 59.2,
    submissions: 1456789,
    description:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.",
      },
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
  },
  {
    id: "p-015",
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    tags: ["Hash Map", "Linked List", "Design", "Doubly-Linked List"],
    acceptanceRate: 40.8,
    submissions: 1289123,
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class:\n\n`LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n`int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.\n`void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.\n\nThe functions `get` and `put` must each run in O(1) average time complexity.",
    examples: [
      {
        input:
          '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation:
          "Explanation\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
  },
  {
    id: "p-016",
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    tags: [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find",
      "Matrix",
    ],
    acceptanceRate: 56.7,
    submissions: 2134567,
    description:
      "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    examples: [
      {
        input:
          'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: "1",
      },
      {
        input:
          'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: "3",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'.",
    ],
  },
  {
    id: "p-017",
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    tags: [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph",
      "Topological Sort",
    ],
    acceptanceRate: 45.4,
    submissions: 1345678,
    description:
      "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nFor example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation:
          "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
      },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All the pairs prerequisites[i] are unique.",
    ],
  },
  {
    id: "p-018",
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    acceptanceRate: 75.4,
    submissions: 1987654,
    description:
      "Given the `root` of a binary tree, invert the tree, and return its root.",
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100",
    ],
  },
  {
    id: "p-019",
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    acceptanceRate: 41.7,
    submissions: 1432198,
    description:
      "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
  },
  {
    id: "p-020",
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "Dynamic Programming"],
    acceptanceRate: 32.4,
    submissions: 2543109,
    description:
      "Given a string `s`, return the longest palindromic substring in `s`.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
      },
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters.",
    ],
  },
  {
    id: "p-021",
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    tags: ["Array", "Hash Map", "String"],
    acceptanceRate: 66.8,
    submissions: 2001234,
    description:
      "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]',
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters.",
    ],
  },
  {
    id: "p-022",
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    tags: ["String"],
    acceptanceRate: 40.8,
    submissions: 2500000,
    description:
      'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.',
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"',
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: "There is no common prefix among the input strings.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters.",
    ],
  },
  {
    id: "p-023",
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    tags: ["Hash Map", "String", "Sliding Window"],
    acceptanceRate: 41.0,
    submissions: 1100000,
    description:
      'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`. The testcases will be generated such that the answer is unique.',
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation:
          "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t.",
      },
      {
        input: 's = "a", t = "a"',
        output: '"a"',
      },
    ],
    constraints: [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters.",
    ],
  },
  {
    id: "p-024",
    slug: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    acceptanceRate: 38.6,
    submissions: 1400500,
    description:
      "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation:
          "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
  },
  {
    id: "p-025",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    tags: [
      "Array",
      "Hash Map",
      "Divide and Conquer",
      "Sorting",
      "Heap (Priority Queue)",
      "Bucket Sort",
    ],
    acceptanceRate: 64.9,
    submissions: 1600200,
    description:
      "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique.",
    ],
  },
  {
    id: "p-026",
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    acceptanceRate: 73.9,
    submissions: 2700000,
    description:
      "Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100",
    ],
  },
  {
    id: "p-027",
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    tags: ["Hash Map", "Depth-First Search", "Breadth-First Search", "Graph"],
    acceptanceRate: 53.2,
    submissions: 980000,
    description:
      "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation:
          "There are 4 nodes in the graph. 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4). 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3). 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4). 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).",
      },
    ],
    constraints: [
      "The number of nodes in the graph is between [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node.",
      "There are no repeated edges and no self-loops in the graph.",
      "The Graph is connected and all nodes can be visited starting from the given node.",
    ],
  },
  {
    id: "p-028",
    slug: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    tags: ["Array", "Backtracking"],
    acceptanceRate: 76.2,
    submissions: 1800000,
    description:
      "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      },
      {
        input: "nums = [0,1]",
        output: "[[0,1],[1,0]]",
      },
      {
        input: "nums = [1]",
        output: "[[1]]",
      },
    ],
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All the integers of nums are unique.",
    ],
  },
  {
    id: "p-029",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 62.8,
    submissions: 3200000,
    description:
      "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
  },
];

export const submissions: Submission[] = [
  {
    id: "s-1001",
    problemId: "p-001",
    problemTitle: "Two Sum",
    language: "TypeScript",
    status: "Accepted",
    runtimeMs: 68,
    memoryMb: 42,
    submittedAt: "2025-02-02T14:12:00Z",
  },
  {
    id: "s-1002",
    problemId: "p-002",
    problemTitle: "Longest Substring Without Repeating Characters",
    language: "Python",
    status: "Wrong Answer",
    runtimeMs: 91,
    memoryMb: 28,
    submittedAt: "2025-02-03T09:41:00Z",
  },
  {
    id: "s-1003",
    problemId: "p-002",
    problemTitle: "Longest Substring Without Repeating Characters",
    language: "Go",
    status: "Accepted",
    runtimeMs: 54,
    memoryMb: 35,
    submittedAt: "2025-02-03T11:18:00Z",
  },
  {
    id: "s-1004",
    problemId: "p-003",
    problemTitle: "Median of Two Sorted Arrays",
    language: "Rust",
    status: "Time Limit",
    runtimeMs: 2000,
    memoryMb: 96,
    submittedAt: "2025-02-04T16:05:00Z",
  },
];

export const discussions: Discussion[] = [
  {
    id: "d-2001",
    problemId: "p-001",
    title: "One-pass hash map explanation",
    author: "neonCoder",
    createdAt: "2025-02-01T13:25:00Z",
    replies: 12,
    likes: 83,
    tags: ["Editorial", "Hash Map"],
  },
  {
    id: "d-2002",
    problemId: "p-002",
    title: "Sliding window invariants",
    author: "byteSage",
    createdAt: "2025-02-02T18:09:00Z",
    replies: 8,
    likes: 51,
    tags: ["Sliding Window", "Tips"],
  },
  {
    id: "d-2003",
    problemId: "p-003",
    title: "Binary search partition intuition",
    author: "algoAtlas",
    createdAt: "2025-02-03T22:43:00Z",
    replies: 19,
    likes: 127,
    tags: ["Binary Search", "Deep Dive"],
  },
];
