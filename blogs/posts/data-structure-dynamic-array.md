---
title: "Data Structure: Dynamic Array"
date: Oct 1, 2021
summary: "I'm fascinated by data structures and often use them in my projects. In this blog, I'll begin by discussing dynamic arrays — what they are, how they work, and when to use them over linked lists."
---

Data structures always catch my interest, and I frequently encounter or use them in my projects. In this blog, I'll start with dynamic arrays.

## What is a Dynamic Array?

A dynamic array (known as `vector` in C++) is a versatile data structure capable of holding a variable number of elements of the same data type. Unlike static arrays, dynamic arrays can expand in size by doubling their capacity when necessary.

When the available space is exhausted, the underlying fixed-size array is enlarged — a costly operation that creates a larger array and copies existing elements. Other names include: array list, growable array, resizable array, and mutable array.

### Dynamic Array in C++

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> dynamicArray;

    dynamicArray.push_back(1);
    dynamicArray.push_back(2);
    dynamicArray.push_back(3);

    std::cout << "Element at index 0: " << dynamicArray[0] << std::endl;

    return 0;
}
```

### Dynamic Array in Python

Python lists are essentially dynamic arrays — they resize automatically as needed.

```python
dynamic_array = []

dynamic_array.append(1)
dynamic_array.append(2)
dynamic_array.append(3)

print("Element at index 0:", dynamic_array[0])
```

## Pros and Cons

### Pros

1. **Dynamic Expandability** — grows as needed; no need to specify size in advance
2. **Fast Lookups** — O(1) constant-time access to any element by index
3. **Cache-friendly** — elements are stored in contiguous memory, optimizing CPU cache performance

### Cons

1. **Slow Resize** — resizing requires copying all elements to a new memory location
2. **Memory Waste** — often allocates more memory than strictly needed to accommodate future growth
3. **Homogeneous Elements** — can only store a single data type per array (in strongly typed languages)

## Static Array vs Dynamic Array vs Linked List

| Criteria | Static Array | Dynamic Array | Linked List |
|---|:---:|:---:|:---:|
| Fixed number of elements | ✓ | | |
| Efficient indexed access | ✓ | ✓ | |
| Constant-time insertions/deletions | | | ✓ |
| Dynamic sizing | | ✓ | ✓ |

**Dynamic Arrays** provide efficient indexed access but are slow for mid-list insertions and deletions — shifting all subsequent elements is required.

**Linked Lists** excel at constant-time insertions and deletions by updating pointers. However, they consume more memory per node (pointer overhead), and their scattered memory layout causes cache misses that make them slower in practice for common use cases.

## Summary

Dynamic arrays are preferable for fast indexed access. Linked lists are ideal when constant-time insertions and deletions are essential — such as in real-time computing or dynamic data structures. Choose based on the dominant operation in your application.
