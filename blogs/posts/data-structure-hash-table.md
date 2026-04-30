---
title: "Data Structure: Hash Table"
date: Oct 25, 2021
summary: "Hash tables employ a hashing function for efficient key-to-value mapping, prioritizing time complexity. Combining linked lists with hash tables can retain insertion order while providing O(1) access."
---

## Introduction

Hash tables allow the mapping of keys to values using a **hashing function**. The hashing function computes the index of the key, which is then mapped to a specific value. This provides the hash table's greatest strength: very fast access time — O(1) on average.

In a previous blog, I discussed the slow access drawback of linked lists. We can actually combine a hash table with a linked list to retain the order of insertion while providing quick access. An example of this in Java is `LinkedHashMap`.

## Implementations

### Hash Table in C++

C++'s `unordered_map` (introduced in C++11) functions as a hash map. It stores key-value pairs with no specific order, but is efficiently organized using a hash table for fast insertion, retrieval, and removal.

In contrast, `std::map` maintains sorted order (implemented as a red-black tree).

```cpp
#include <iostream>
#include <unordered_map>

int main() {
    std::unordered_map<int, int> hashMap;
    int arr[] = {20, 34, 56, 54, 76, 87};
    int n = sizeof(arr) / sizeof(arr[0]);

    // Insert elements
    for (int i = 0; i < n; i++) {
        hashMap[arr[i]] = arr[i];
    }

    // Delete an element
    hashMap.erase(34);

    // Display
    for (const auto& pair : hashMap) {
        std::cout << pair.first << " ==> " << pair.second << std::endl;
    }

    return 0;
}
```

### Hash Table in Python

Python's built-in dictionary is a hash table. Since Python 3.7, dictionaries maintain insertion order by default (like `LinkedHashMap` in Java). Before 3.7, you needed `OrderedDict` for this behavior.

```python
hashMap = {}
arr = [20, 34, 56, 54, 76, 87]

# Insert elements
for num in arr:
    hashMap[num] = num

# Delete an element
if 34 in hashMap:
    del hashMap[34]

# Display
for key, value in hashMap.items():
    print(f"{key} ==> {value}")
```

> Note: In Python, a `set` is also implemented as a hash table, giving it O(1) membership checks.

## Pros and Cons

### Pros

- **O(1) average lookup** — the hash code directly determines the storage location, regardless of map size.
- **O(1) average insertion** — hashing doesn't depend on the size of the hash map.

### Cons

- **Rehashing overhead** — too many insertions can trigger a full rebuild of the underlying data structure when the load factor threshold is exceeded.
- **Unordered iteration** — elements don't come out in any particular order. Use `std::map` if you need sorted order.

## When to Use `std::map` vs `std::unordered_map`

**Use `std::map` (ordered) when:**
- You need elements in sorted order by key
- You need to find the smallest or largest key quickly
- You want to iterate in ascending/descending order
- The problem involves range queries

**Use `std::unordered_map` (hash map) when:**
- You need fast key-based access and order doesn't matter
- You need to count or track occurrences efficiently
- You need fast insertions and deletions without ordering
