---
title: "Data Structure: Linked List"
date: Oct 20, 2021
summary: "I implemented a circular doubly linked list at Continental Automotive for a warning feature requiring O(1) insertions and deletions at runtime. This blog covers singly, doubly, and circular linked lists with C++ and Python examples."
---

## Introduction

When I joined Continental Automotive as a software developer and took on the role of Warning Feature Responsible for a Full Digital Cluster project, I faced the challenge of designing a feature with complex requirements from the ground up. One key module required performing flexible and extensive insertion and deletion of warnings during runtime.

I chose to implement a **circular doubly linked list** as the underlying data structure. Its O(1) time complexity for insertion and deletion, along with its straightforward implementation, made it the ideal choice for handling a substantial volume of real-time insertions and deletions.

## Implementations

### Linked List in C++

```cpp
#include <iostream>

class Node {
public:
    int value;
    Node* next;
    Node(int val) : value(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;
    LinkedList() : head(nullptr) {}

    void append(int value) {
        Node* new_node = new Node(value);
        if (head == nullptr) {
            head = new_node;
        } else {
            Node* current = head;
            while (current->next != nullptr) {
                current = current->next;
            }
            current->next = new_node;
        }
    }

    void display() {
        Node* current = head;
        while (current != nullptr) {
            std::cout << current->value << " ";
            current = current->next;
        }
        std::cout << std::endl;
    }
};

int main() {
    LinkedList my_list;
    my_list.append(1);
    my_list.append(2);
    my_list.append(3);
    my_list.display();
    return 0;
}
```

> In practice, you can use the C++ STL `std::list` which is much simpler.

### Linked List in Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
        else:
            current = self.head
            while current.next is not None:
                current = current.next
            current.next = new_node

    def display(self):
        current = self.head
        while current is not None:
            print(current.value, end=' ')
            current = current.next
        print()

my_list = LinkedList()
my_list.append(1)
my_list.append(2)
my_list.append(3)
my_list.display()
```

## Why Circular Doubly Linked List?

The basic examples above show a simple singly linked list, but for my warning feature module I needed something more capable.

A **circular doubly linked list** combines two ideas:

- **Doubly linked** — each node knows both the previous and next node, allowing efficient forward and backward traversal. New warnings are inserted at the front of the current warning list.
- **Circular** — the last node points back to the first, creating an endless loop. This allows warnings to cycle from the end back to the start — exactly what the requirements demanded.

## Singly vs Doubly vs Circular Linked Lists

| Type | Use Case | Advantages | Considerations |
|---|---|---|---|
| Singly Linked List | Linear, forward traversal | Memory-efficient (one pointer per node) | Use for stacks, queues, forward-only algorithms |
| Doubly Linked List | Forward and backward traversal | Easy access to previous elements | Use for deques and bidirectional traversal needs |
| Circular Linked List | Looped / cyclic structures | Efficient for cyclic data management | Use when elements need to cycle continuously |

## Pros and Cons

### Pros

1. **Dynamic size** — adjusts based on the number of elements
2. **No memory waste** — does not pre-allocate for unused elements
3. **No overflow** — as long as memory is available
4. **O(1) insertion and deletion** — only pointer updates are needed

### Cons

1. **Extra memory** — each node needs additional space for pointer(s)
2. **Slow access** — accessing the middle of a list is O(n)
3. **No random access** — cannot directly index to a specific position
4. **Cache unfriendly** — nodes are scattered in memory, causing more cache misses vs arrays
5. **Memory fragmentation** — over time, scattered allocation can decrease performance
