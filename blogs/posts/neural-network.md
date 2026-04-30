---
title: "What is Neural Network?"
date: Feb 11, 2022
summary: "This blog explains neural networks, their role in AI and machine learning, and how they've evolved. It covers distinctions between AI, ML, and deep learning, forward/backward propagation, cost functions, activation functions, and regularization."
---

## AI vs ML vs DL

Understanding neural networks is key in the world of AI. These networks, inspired by the human brain, play a pivotal role in machine learning, powering applications like image recognition and natural language processing. While terms like AI, ML, and DL are often used interchangeably, they have unique meanings. Let's explore the differences.

**AI (Artificial Intelligence)** is the broader goal of creating intelligent machines, involving software that replicates human-like intelligence through predefined rules. Examples include virtual assistants like Siri, self-driving cars, and more. AI automates tasks, reasoning, and learning from data. It includes subsets like Machine Learning, Robotics, Natural Language Processing, Machine Vision, and Expert Systems.

![AI Subsets](../resource/images/AI subsets.png)

**ML (Machine Learning)** is a part of AI where algorithms learn from data instead of following fixed rules. Unlike traditional AI, ML algorithms find patterns, make predictions, and offer suggestions based on past experiences. For instance, Netflix suggests shows based on your watching history, and fraud detection spots unusual transactions.

**DL (Deep Learning)** is a subset of ML that employs deep neural networks to learn intricate patterns from data. Inspired by the brain, these networks autonomously excel at complex feature learning. Examples include CNN for image analysis, RNN for sequences, and GAN for creative generation.

## Perceptron vs Neuron

**Perceptron** is an early type of neural network that always produced binary output based on a threshold. It is also known as a Linear Binary Classifier.

**Neuron** is a generalisation of the perceptron where the output is not necessarily binary, and it could employ a non-linear activation function.

![Neuron](../resource/images/neuron.PNG)

## Deep Dive into Neural Network

In software engineering, think of artificial neural networks like a chain of circles. These circles represent neurons, and they come in three types: input (red), hidden (blue), and output (green).

- **Input neurons** take numeric data, process it, and pass it to the next layer using special math functions. They also use preset weights to adjust the data along the way.
- **Hidden neurons** receive data from input or other hidden neurons, perform their own calculations, and send it to the next layer.
- **Output neurons** process the information and provide results, like saying "yes" or "no" or classifying what's in an image.

![Neural Network](../resource/images/neural network.png)

### Forward Propagation

Forward propagation is like sending a message through a network. You start with input data and move it forward, layer by layer. Each layer does some math on the data. In each layer, two important things happen:

1. We calculate a **weighted sum** — adding up the data with special numbers (weights).
2. We apply an **activation function** — adding non-linearity to the data flow.

This whole process helps the network make better predictions.

### Backward Propagation

Backpropagation comes into play after forward propagation is complete. It works backward through the network, using the errors detected in the forward pass to adjust the network's internal weights from output to input. This iterative process of forward and backward passes helps the network improve its accuracy over time.

In simple terms: forward propagation makes predictions, and backpropagation corrects and refines those predictions.

### Gradient Descent

Gradient descent relies on the insights provided by backpropagation to calculate gradients, which guide the network towards the optimal weight configuration that minimizes the cost function. The **learning rate** determines the step size taken along the gradient, influencing how swiftly the network converges.

![Gradient Descent](../resource/images/Gradient Descent.PNG)

### Cost Function

A cost function quantifies the disparity between predicted and expected values as a single number. They play a vital role in algorithms that use gradient descent for parameter optimization. Examples:

| Cost Function | Typical Use Scenario |
|---|---|
| Mean Squared Error | Regression tasks — average squared difference between predicted and actual values |
| Mean Absolute Error | Regression — average absolute difference between predicted and actual values |
| Binary Cross-Entropy | Binary classification — measures how well the model predicts probabilities for two classes |
| Hinge Loss | SVMs and binary classification — encourages correct classification with a margin |
| Multi-Class Cross-Entropy | Multi-class classification problems |
| Kullback Leibler Divergence | Measuring difference between two probability distributions |

![Cost Function Example](../resource/images/Cost Function Example1.PNG)

### Activation Function

An activation function decides whether a neuron should be activated or not by calculating the weighted sum and adding bias. Its main purpose is to introduce **non-linearity** into the output of a neuron. Without them, a neural network would behave like a linear regression model.

| Activation Function | Typical Use Scenario |
|---|---|
| Sigmoid | Binary classification — squashes output between 0 and 1, resembling a probability |
| Hyperbolic Tangent (tanh) | Similar to sigmoid but squashes output between -1 and 1, suitable for zero-centered data |
| ReLU | Widely used in deep learning due to its simplicity and efficiency |

![Sigmoid](../resource/images/sigmoid.PNG)

![Hyperbolic Tangent](../resource/images/Hyperbolic Tangent.PNG)

![ReLU](../resource/images/RELU.PNG)

### Regularization

One of the greatest challenges in neural network training is **overfitting** — performing well on training data but poorly on unseen test data. Common regularization techniques:

| Technique | Brief Explanation |
|---|---|
| Early Stopping | Stops training when validation performance starts to degrade |
| L1 and L2 Regularization | Penalizes large weight values to prevent overfitting |
| Data Augmentation | Expands training dataset by applying transformations to existing data |
| Dropout | Randomly deactivates a fraction of neurons during each training step |
| Additional Noise | Introduces random noise during training to improve robustness |

### Optimization

Optimizers are algorithms used to adjust the attributes of your neural network (weights, learning rate) to minimize losses.

| Optimizer | Brief Explanation |
|---|---|
| Gradient Descent | Uses gradients to iteratively adjust weights to minimize the loss function |
| SGD | Updates weights using a random subset of training data at each iteration |
| Mini-Batch Gradient Descent | Combines gradient descent and SGD using small random batches |
| Adam | Adapts learning rate per parameter, combines momentum and RMSprop |
| RMSprop | Adapts learning rate per parameter based on magnitude of recent gradients |
| Momentum | Adds a fraction of previous weight update to current update |
| Adagrad | Adapts learning rates based on historical gradient information |

## References

- [https://towardsdatascience.com/what-the-hell-is-perceptron-626217814f53](https://towardsdatascience.com/what-the-hell-is-perceptron-626217814f53)
- [https://levity.ai/blog/difference-machine-learning-deep-learning](https://levity.ai/blog/difference-machine-learning-deep-learning)
- [https://www.kdnuggets.com/2016/11/quick-introduction-neural-networks.html](https://www.kdnuggets.com/2016/11/quick-introduction-neural-networks.html)
