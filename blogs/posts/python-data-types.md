---
title: "Python: List vs Tuple vs Set vs Dict"
date: Oct 26, 2021
summary: "In Python, there are four basic data types: List, Tuple, Set, and Dictionary. These serve different purposes, so choosing the right one is important for efficient coding. This blog explains when to use each type."
---

List, Tuple, Set, and Dictionary are fundamental data types in Python, each serving specific purposes. Selecting the appropriate type can significantly impact execution time and memory efficiency.

## List

A list is a collection of items arranged in a specific order. You can access items using indices like `my_list[0]`. Lists are mutable — you can change the contents after creation.

```python
python_list = ['one', 2, 3.4, 'hello']
print(python_list)       # ['one', 2, 3.4, 'hello']
print(python_list[3])    # hello
python_list[1] = 99
print(python_list)       # ['one', 99, 3.4, 'hello']
```

## Tuple

Tuples are similar to lists but **immutable** — you cannot change their elements once assigned. They are faster than lists and ideal for storing constant values you only iterate through.

```python
python_tuple = (1, 'raju', 28, 'abc')
print(python_tuple)      # (1, 'raju', 28, 'abc')
print(python_tuple[1])   # raju
```

## Set

A set is a collection that **does not allow duplicates**. It's excellent for fast membership checks (O(1)) and mathematical set operations, but it does not maintain insertion order.

```python
python_set_1 = {1, 2, 3}
print(python_set_1)       # {1, 2, 3}

python_set_2 = set(['foo', 'bar', 'baz', 'foo', 'qux'])
print(python_set_2)       # {'qux', 'foo', 'bar', 'baz'}
```

## Dictionary

A dictionary functions like a hash table, associating keys with values. Dictionaries are mutable and, since Python 3.7, maintain insertion order (similar to `LinkedHashMap` in Java).

```python
python_dict = {"Nishant": 1, "Akash": 2, "Ravi": 3, "Hari": 4}
print(python_dict)           # {'Nishant': 1, 'Akash': 2, ...}
print(python_dict["Akash"])  # 2
```

> Note: `a = {}` creates a **dict**, not a set. Use `a = set()` to create an empty set.

## Summary

| Property | List | Tuple | Set | Dictionary |
|---|---|---|---|---|
| Syntax | `[ ]` | `( )` | `{ }` | `{ }` |
| Mutable | Yes | No | Yes | Yes |
| Ordered | Yes | Yes | No | Yes (Python 3.7+) |
| Duplicates | Allowed | Allowed | Not allowed | Keys not allowed |
| Indexing | Yes | Yes | No | By key |
| Slicing | Yes | Yes | No | No |
| Common Ops | `append()`, `insert()`, `remove()` | Concatenation, indexing | `add()`, `union()`, `intersection()` | `keys()`, `values()`, `get()` |
| Best For | Mutable ordered sequences | Immutable sequences, return values | Deduplication, set math | Key-value lookups |
