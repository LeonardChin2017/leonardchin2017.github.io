---
title: "Data Structure: Stack vs Queue"
date: Oct 22, 2021
summary: "Queue and stack are abstract concepts for organizing data. A queue follows the First In, First Out (FIFO) principle, while a stack follows the Last In, First Out (LIFO) principle. Both can be implemented with arrays or linked lists."
---

Queue and stack are concepts that describe how you manage data. Under the hood, they can be implemented with either an array or a linked list.

- **Stack** — Last In, First Out (LIFO)
- **Queue** — First In, First Out (FIFO)

## Stack

A stack follows the **LIFO** principle. Whenever you need to reverse the order of elements and retrieve them in constant time, a stack is the right tool.

### Applications

1. Achieving the 'undo' operation in text editors
2. The browser's back button
3. Call stack in recursive function execution

### Usage

- **C++** — use the `stack` library: [https://cplusplus.com/reference/stack/stack/](https://cplusplus.com/reference/stack/stack/)
- **Python** — use a `list` as a stack (`append()` to push, `pop()` to pop)

```python
stack = []
stack.append('a')
stack.append('b')
stack.append('c')
print(stack.pop())  # c (last in, first out)
```

## Queue

A queue follows the **FIFO** principle.

### Applications

1. Call center phone systems — holds callers in order until a representative is free
2. CPU scheduling and disk scheduling
3. Print spooling
4. Breadth-First Search (BFS) in graphs
5. Handling interrupts in real-time systems (First Come, First Served)

### Usage

- **C++** — use the `queue` library: [https://en.cppreference.com/w/cpp/container/queue](https://en.cppreference.com/w/cpp/container/queue)
- **Python** — use `collections.deque` for efficient queue operations: [https://docs.python.org/3/library/collections.html#deque-objects](https://docs.python.org/3/library/collections.html#deque-objects)

```python
from collections import deque

queue = deque()
queue.append('a')
queue.append('b')
queue.append('c')
print(queue.popleft())  # a (first in, first out)
```

## Summary

Use a **queue** when you want to retrieve items in the order you added them. Use a **stack** when you prefer to retrieve items in reverse order of how you added them.
